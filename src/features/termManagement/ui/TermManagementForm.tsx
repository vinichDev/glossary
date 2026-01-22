"use client";

import type { ChangeEvent } from "react";
import styles from "./TermManagementForm.module.scss";
import type { TermPayload } from "@/entities/term/model/types";

type TermManagementFormProps = {
  termForm: TermPayload;
  relatedInput: string;
  selectedKeyword: string | null;
  isSaving: boolean;
  actionMessage: string | null;
  onFormChange: (next: TermPayload | ((prev: TermPayload) => TermPayload)) => void;
  onRelatedInputChange: (next: string) => void;
  onCreateTerm: () => void;
  onUpdateTerm: () => void;
  onDeleteTerm: () => void;
};

export const TermManagementForm = ({
  termForm,
  relatedInput,
  selectedKeyword,
  isSaving,
  actionMessage,
  onFormChange,
  onRelatedInputChange,
  onCreateTerm,
  onUpdateTerm,
  onDeleteTerm
}: TermManagementFormProps) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const field = name as keyof TermPayload;
    onFormChange((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className={styles.manageSection}>
      <div className={styles.manageHeader}>
        <h2 className={styles.manageTitle}>Управление терминами</h2>
        <p className={styles.manageHint}>
          Используйте форму для добавления новых терминов или редактирования выбранного.
        </p>
      </div>
      <form className={styles.manageForm} onSubmit={(event) => event.preventDefault()}>
        <label className={styles.manageField}>
          Ключевое слово
          <input
            className={styles.manageInput}
            name="keyword"
            value={termForm.keyword}
            onChange={handleInputChange}
            placeholder="например, rendering"
          />
        </label>
        <label className={styles.manageField}>
          Заголовок
          <input
            className={styles.manageInput}
            name="title"
            value={termForm.title}
            onChange={handleInputChange}
            placeholder="Название термина"
          />
        </label>
        <label className={styles.manageField}>
          Описание
          <textarea
            className={styles.manageTextarea}
            name="description"
            value={termForm.description}
            onChange={handleInputChange}
            rows={4}
          />
        </label>
        <label className={styles.manageField}>
          Источник
          <input
            className={styles.manageInput}
            name="source"
            value={termForm.source}
            onChange={handleInputChange}
            placeholder="Название источника"
          />
        </label>
        <label className={styles.manageField}>
          Ссылка на источник
          <input
            className={styles.manageInput}
            name="sourceUrl"
            value={termForm.sourceUrl}
            onChange={handleInputChange}
            placeholder="https://example.com"
          />
        </label>
        <label className={styles.manageField}>
          Связанные термины (через запятую)
          <input
            className={styles.manageInput}
            value={relatedInput}
            onChange={(event) => onRelatedInputChange(event.target.value)}
            placeholder="csr, ssr"
          />
        </label>
        <div className={styles.manageActions}>
          <button
            className={styles.manageButton}
            type="button"
            onClick={onCreateTerm}
            disabled={isSaving}
          >
            Добавить
          </button>
          <button
            className={styles.manageButton}
            type="button"
            onClick={onUpdateTerm}
            disabled={isSaving || !selectedKeyword}
          >
            Обновить выбранный
          </button>
          <button
            className={styles.manageButtonDanger}
            type="button"
            onClick={onDeleteTerm}
            disabled={isSaving || !selectedKeyword}
          >
            Удалить выбранный
          </button>
        </div>
        {actionMessage && <p className={styles.manageMessage}>{actionMessage}</p>}
      </form>
    </section>
  );
};
