import { Button, Flex, Loader, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetColumnsQuery } from 'store/api/columns';
import { setIsOpen } from 'store/columnSlice';
import Column from './Column/Column';
import cl from './ColumnList.module.css';
import ModalContent from './ModalContent/ModalContent';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useUpdateTasksSetMutation } from 'store/api/tasks';
import { ITask } from 'interfaces/ITask';
import { setTasks, setTasksByColumn } from 'store/taskListSlice';

// const reorder = (array: Array<ITask>, from: number, to: number) => {
//   const a = [...array];
//   const tmp = a[to];
//   a[to] = a[from];
//   a[from] = tmp;
//   return a.map((t: ITask, index) => ({ _id: t._id, order: index, columnId: t.columnId }));
// };

const reorder = (sourceArray: Array<ITask>, from: number, to: number) => {
  const a = [...sourceArray];
  const tmp = a[from];
  a[from] = a[to];
  a[to] = tmp;
  return a.map((t: ITask, index) => ({ ...t, order: index }));
};

const reorderBetween = (
  sourceArray: Array<ITask>,
  destinationArray: Array<ITask>,
  from: number,
  to: number,
  column: string
) => {
  let a = [...sourceArray];
  let b = [...destinationArray];
  const reasamedTask = { ...a[from] };
  reasamedTask.order = to;
  reasamedTask.columnId = column;

  a = a.map((value: ITask) => {
    if (value.order > from) {
      return { ...value, order: value.order - 1 };
    } else {
      return { ...value, order: value.order };
    }
  });
  b = b.map((value: ITask) => {
    if (value.order >= to) {
      return { ...value, order: value.order + 1 };
    } else {
      return { ...value, order: value.order };
    }
  });
  b.push(reasamedTask);
  a.splice(from, 1);
  return { sourceArray: a, destinationArray: b };
};

const ColumnList = memo(() => {
  const taskListState = useAppSelector((state) => state.taskList);
  const selectedBoardId = useAppSelector((state) => state.boards.selectedBoardId);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.column.isOpen);
  const [updateTasksMutation, { isLoading }] = useUpdateTasksSetMutation();

  const { t } = useTranslation();
  const boardId = useParams<{ id: string }>().id;
  if (!boardId) throw new Error('Unable get id from url!');

  const { data: columns, isFetching, error } = useGetColumnsQuery(boardId);

  const closeModal = useCallback(() => {
    dispatch(setIsOpen(false));
  }, []);

  const openModal = useCallback(() => {
    dispatch(setIsOpen(true));
  }, []);

  if (typeof error == 'number') return <div>{`${t('Ошибка ')} ${error}`}</div>;
  if (isFetching)
    return (
      <div className="align-loader">
        <Loader style={{ width: '100%' }} color="dark" />
      </div>
    );
  if (!columns) return <div>{t('Ничего не найдено!')}</div>;

  return (
    <>
      <DragDropContext
        onDragEnd={async ({ destination, source }) => {
          if (source?.droppableId == destination?.droppableId) {
            const reorderedArray = reorder(
              taskListState[selectedBoardId][source?.droppableId],
              source.index,
              destination?.index || 0
            );
            console.log(reorderedArray);
            dispatch(
              setTasksByColumn({
                boardID: selectedBoardId,
                columnID: destination?.droppableId || '',
                array: reorderedArray,
              })
            );
            await updateTasksMutation(
              reorderedArray.map((t: ITask, index) => ({
                _id: t._id,
                order: index,
                columnId: t.columnId,
              }))
            );
          } else {
            const reorderedArrays = reorderBetween(
              taskListState[selectedBoardId][source?.droppableId],
              taskListState[selectedBoardId][destination?.droppableId || 0],
              source.index,
              destination?.index || 0,
              destination?.droppableId || ''
            );
            console.log(reorderedArrays);
            dispatch(
              setTasksByColumn({
                boardID: selectedBoardId,
                columnID: destination?.droppableId || '',
                array: reorderedArrays.destinationArray,
              })
            );
            dispatch(
              setTasksByColumn({
                boardID: selectedBoardId,
                columnID: source?.droppableId,
                array: reorderedArrays.sourceArray,
              })
            );
            await updateTasksMutation(
              [...reorderedArrays.destinationArray, ...reorderedArrays.sourceArray].map(
                (t: ITask) => ({
                  _id: t._id,
                  order: t.order,
                  columnId: t.columnId,
                })
              )
            );
          }
        }}
      >
        <OverlayScrollbarsComponent
          className={cl.scroll}
          defer
          options={{
            scrollbars: { theme: 'board-scroll' },
            overflow: {
              y: 'hidden',
              x: 'scroll',
            },
          }}
        >
          <Flex className={cl.row} gap={{ base: 'sm', sm: 'lg' }}>
            {columns.map((column) => (
              <Column _id={column._id} boardId={boardId} key={column._id} />
            ))}
            <Button
              onClick={openModal}
              radius={17}
              fullWidth={true}
              variant="outline"
              type="submit"
              leftIcon={<IconPlus size={20} />}
              classNames={ButtonClasses}
            >
              {t('Create column')}
            </Button>
          </Flex>
        </OverlayScrollbarsComponent>
        <Modal centered opened={isOpen} title={t('Create column')} onClose={closeModal}>
          <ModalContent />
        </Modal>
      </DragDropContext>
    </>
  );
});

const ButtonClasses = {
  input: cl.columnBtn,
  root: cl.columnBtnWrapper,
  inner: cl.columnBtnInner,
};

export default ColumnList;
