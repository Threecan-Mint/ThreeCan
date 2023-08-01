import React, { FC, useState } from "react";
import { ExportButton } from "./export/ExportButton";
import { DocumentExporter } from "./export/DocumentExporter";

interface CanvaExportProps {
  setExportedFile: (file: File | null) => void;
}

export const CanvaExport: FC<CanvaExportProps> = ({ setExportedFile }) => {
  const [exporting, setExporting] = useState<boolean>(false);

  return (
    <>
      <ExportButton exporting={exporting} exportDocument={() => setExporting(true)} />
      {exporting && <DocumentExporter setExportedFile={setExportedFile} setExporting={setExporting} />}
    </>
  );
};

export default CanvaExport;
