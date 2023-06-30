import React, { FC } from "react";
import { Button } from "@canva/app-ui-kit";

interface ExportButtonProps {
  exporting: boolean;
  exportDocument: () => void;
}

export const ExportButton: FC<ExportButtonProps> = ({ exporting, exportDocument }) => (
  <Button
    variant="primary"
    onClick={exportDocument}
    loading={exporting}
    stretch
  >
    Export Design
  </Button>
);
