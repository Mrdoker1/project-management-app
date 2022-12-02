import { CloseButton, Text, Title } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import TaskList from 'components/TaskList/TaskList';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDeleteColumnByIdMutation,
  useGetColumnsQuery,
  useUpdateColumnByIdMutation,
} from 'store/api/columns';
import { getHtmlElement } from 'utils/getHtmlElement';
import cl from './Column.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface IColumnProps {
  _id: string;
  boardId: string;
}

const Column = memo<IColumnProps>(({ _id, boardId }) => {
  const { t } = useTranslation();
  const [columnTitle, setColumnTitle] = useState('');

  const [updateColumn] = useUpdateColumnByIdMutation();
  const [deleteColumn] = useDeleteColumnByIdMutation();

  const { column } = useGetColumnsQuery(boardId, {
    selectFromResult: ({ data }) => ({
      column: data?.find((column) => column._id === _id),
    }),
  });

  const saveCurrentTitle = (e: React.FormEvent) => {
    const target = getHtmlElement(e.target);
    const title = target.textContent ?? '';
    setColumnTitle(title);
  };

  const updateColumnTitle = (e: React.FormEvent) => {
    const target = getHtmlElement(e.target);
    const title = target.textContent;
    if (!column || title === columnTitle) return;
    if (!title) {
      target.innerHTML = columnTitle;
      return;
    }
    const changedColumn = { ...column, title };
    updateColumn(changedColumn);
  };

  const deleteColumnHandler = () => {
    openConfirmModal({
      title: t('Delete column'),
      modalId: 'columnDeleteModal',
      centered: true,
      children: (
        <Text size="sm">
          {t('Are you sure you want to delete this column? This action is destructive.')}
        </Text>
      ),
      labels: { confirm: t('Delete column'), cancel: t('Cancel') },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await deleteColumn({ _id, boardId });
      },
    });
  };

  if (!column) {
    console.log('Сolumn not found in cache!');
    return null;
  }

  return (
    <Droppable droppableId={_id} direction="vertical">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className={cl.column}>
            <div className={cl.header}>
              <Title
                order={3}
                className={cl.title}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onFocus={saveCurrentTitle}
                onBlur={updateColumnTitle}
              >
                {column.title}
              </Title>
              <CloseButton onClick={deleteColumnHandler} size={24} className={cl.closeBtn} />
            </div>
            <TaskList boardId={boardId} columnId={_id} placeholder={provided.placeholder} />
          </div>
        </div>
      )}
    </Droppable>
  );
});

export default Column;
