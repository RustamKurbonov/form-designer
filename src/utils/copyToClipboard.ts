export const copyToClipboard = (textToCopy: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy);
  } else {
    return new Promise((resolve): void => {
      const listener = (e: ClipboardEvent): void => {
        e.clipboardData?.setData('text/plain', textToCopy);
        e.preventDefault();
      };
      document.addEventListener('copy', listener);
      document.execCommand('copy');
      document.removeEventListener('copy', listener);
      resolve();
    });
  }
};
