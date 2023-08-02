import { FC, useEffect } from "react";
import { ExportFileType, requestExport } from "@canva/design"; // Importing the specific type

interface DocumentExporterProps {
  onExportCompleted: (file: File) => void;
  onExportAborted: () => void;
  onExportingChange: (exporting: boolean) => void;
}


const acceptedFileTypes: ExportFileType[] = ["PNG", "PDF_STANDARD", "JPG", "GIF", "SVG", "VIDEO", "PPTX"] as ExportFileType[]; // Type casting

async function fetchExportedFile(url: string, fileName: string): Promise<File | null> {
  try {
    const responseBlob = await fetch(url);
    const file = new File([await responseBlob.blob()], fileName, { type: 'image/png' });
    return file;
  } catch (error) {
    console.error("Failed to fetch exported file:", error);
    return null;
  }
}

export const DocumentExporter: FC<DocumentExporterProps> = ({ onExportCompleted, onExportAborted, onExportingChange }) => {
  useEffect(() => {
    const exportDocument = async () => {
      onExportingChange(true);
      const response = await requestExport({ acceptedFileTypes });

      if (response.status === "COMPLETED" && response.exportBlobs && response.exportBlobs.length > 0) {
        // Generate a unique file name or fetch it based on your logic
        const fileName = `exported_design_${Date.now()}.png`;
        const file = await fetchExportedFile(response.exportBlobs[0].url, fileName);
        if (file) onExportCompleted(file);
      } else {
        onExportAborted();
      }

      onExportingChange(false);
    };

    exportDocument();
  }, [onExportCompleted, onExportAborted, onExportingChange]);

  return null;
};
