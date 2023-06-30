import { FC, useEffect } from "react";
import { ExportResponse, requestExport } from "@canva/design";

interface DocumentExporterProps {
  setExportedFile: (file: File | null) => void;
  setExporting: (exporting: boolean) => void;
}

export const DocumentExporter: FC<DocumentExporterProps> = ({ setExportedFile, setExporting }) => {
  useEffect(() => {
    const exportDocument = async () => {
      setExporting(true);
      try {
        const response: ExportResponse = await requestExport({
          acceptedFileTypes: ["PNG", "PDF_STANDARD", "JPG", "GIF", "SVG", "VIDEO", "PPTX"],
        });

        // Fetch the file from the URL
        const responseBlob = await fetch(response.exports[0].url);
        const file = new File([await responseBlob.blob()], 'exported_design.png', { type: 'image/png' });
        setExportedFile(file);

      } catch (error) {
        console.error("Failed to export design:", error);
        setExportedFile(null);
      } finally {
        setExporting(false);
      }
    };

    exportDocument();
  }, [setExportedFile, setExporting]);

  return null;
};
