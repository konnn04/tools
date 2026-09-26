import { useState } from "react";
import { useTranslation } from "./lib/i18n";
import { ClipboardPaste } from "lucide-react";
import { Button } from "@/shared/ui";
import type { EditorCanvasHandle } from "./EditorCanvas";

/**
 * The mouse route into the clipboard. Deliberately a different mechanism from
 * Ctrl+V: a native `paste` event carries the user's own gesture and needs no
 * prompt at all, while reading the clipboard on a button press goes through
 * the async Clipboard API, which the browser may gate behind a permission.
 */
export function PasteButton({
  canvasRef,
  onError,
}: {
  canvasRef: React.RefObject<EditorCanvasHandle | null>;
  onError: (messageKey: string) => void;
}) {
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);

  const paste = async () => {
    setBusy(true);
    try {
      // the browser asks for clipboard access itself on this call; a refusal lands in the NotAllowedError branch below
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const type = item.types.find((ty) => ty.startsWith("image/"));
        if (!type) continue;
        const blob = await item.getType(type);
        const dataURL = await blobToDataURL(blob);
        await canvasRef.current?.addImageFromDataURL(dataURL);
        return;
      }
      onError("imageEditor.clipboardNoImage");
    } catch (err) {
      onError(err instanceof DOMException && err.name === "NotAllowedError" ? "imageEditor.clipboardDenied" : "imageEditor.clipboardFailed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button disabled={busy} onClick={() => void paste()}>
      <ClipboardPaste size={15} />
      {t("imageEditor.paste")}
    </Button>
  );
}

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(blob);
  });
}
