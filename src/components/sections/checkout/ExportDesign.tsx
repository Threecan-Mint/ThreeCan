import React, { FC, useState, useCallback } from "react";
import { ExportButton } from "./export/ExportButton";
import { DocumentExporter } from "./export/DocumentExporter";

interface CanvaExportProps {
  setExportedFile: (file: File | null) => void;
}

export const CanvaExport: FC<CanvaExportProps> = ({ setExportedFile }) => {
  const [exporting, setExporting] = useState<boolean>(false);

  const onExportCompleted = useCallback((file: File) => {
    setExportedFile(file);
    setExporting(false);
  }, [setExportedFile]);

  const onExportAborted = useCallback(() => {
    setExportedFile(null);
    setExporting(false);
  }, [setExportedFile]);

  return (
    <>
      <ExportButton exporting={exporting} exportDocument={() => setExporting(true)} />
      {exporting && (
        <DocumentExporter
          onExportCompleted={onExportCompleted}
          onExportAborted={onExportAborted}
          onExportingChange={setExporting}
        />
      )}
    </>
  );
};

export default CanvaExport;
