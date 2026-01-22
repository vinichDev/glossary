import { useEffect, useState } from "react";
import type { Term } from "@/shared/types/term";
import type { TermPayload } from "@/entities/term/model/types";
import {
  createTerm,
  deleteTerm,
  updateTerm
} from "@/entities/term/api/termsApi";

type UseTermManagementParams = {
  selectedTerm: Term | null;
  selectedKeyword: string | null;
  onSelectKeyword: (keyword: string | null) => void;
  onRefreshTerms: () => void;
};

export const useTermManagement = ({
  selectedTerm,
  selectedKeyword,
  onSelectKeyword,
  onRefreshTerms
}: UseTermManagementParams) => {
  const [formValues, setFormValues] = useState<TermPayload>({
    keyword: "",
    title: "",
    description: "",
    source: "",
    sourceUrl: "",
    related: []
  });
  const [relatedInput, setRelatedInput] = useState("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!selectedTerm) {
      return;
    }
    setFormValues({
      keyword: selectedTerm.keyword,
      title: selectedTerm.title,
      description: selectedTerm.description,
      source: selectedTerm.source,
      sourceUrl: selectedTerm.sourceUrl,
      related: selectedTerm.related
    });
    setRelatedInput(selectedTerm.related.join(", "));
  }, [selectedTerm]);

  const buildRelated = () =>
    relatedInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const createHandler = async () => {
    setIsSaving(true);
    setActionMessage(null);
    try {
      const payload = {
        ...formValues,
        related: buildRelated()
      };
      const created = await createTerm(payload);
      onSelectKeyword(created.keyword);
      setActionMessage("Термин добавлен.");
      onRefreshTerms();
    } catch (error) {
      setActionMessage("Ошибка при добавлении термина.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateHandler = async () => {
    if (!selectedKeyword) {
      setActionMessage("Выберите термин для обновления.");
      return;
    }
    setIsSaving(true);
    setActionMessage(null);
    try {
      const payload = {
        title: formValues.title,
        description: formValues.description,
        source: formValues.source,
        sourceUrl: formValues.sourceUrl,
        related: buildRelated()
      };
      const updated = await updateTerm(selectedKeyword, payload);
        onSelectKeyword(updated.keyword);
      setActionMessage("Термин обновлён.");
      onRefreshTerms();
    } catch (error) {
      setActionMessage(`Ошибка при обновлении термина.`);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteHandler = async () => {
    if (!selectedKeyword) {
      setActionMessage("Выберите термин для удаления.");
      return;
    }
    setIsSaving(true);
    setActionMessage(null);
    try {
      await deleteTerm(selectedKeyword);
      onSelectKeyword(null);
      setFormValues({
        keyword: "",
        title: "",
        description: "",
        source: "",
        sourceUrl: "",
        related: []
      });
      setRelatedInput("");
      setActionMessage("Термин удалён.");
      onRefreshTerms();
    } catch (error) {
      setActionMessage("Ошибка при удалении термина.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    actionMessage,
    createHandler,
    deleteHandler,
    formValues,
    isSaving,
    relatedInput,
    setFormValues,
    setRelatedInput,
    updateHandler
  };
};
