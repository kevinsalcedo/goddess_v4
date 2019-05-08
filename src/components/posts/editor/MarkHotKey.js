function MarkHotKey(options) {
  const { type, key } = options;

  return {
    onKeyDown(event, editor, next) {
      // If it doesn't match our key, let another plugin handle it
      if (!event.ctrlKey || event.key !== key) {
        return next();
      }
      event.preventDefault();

      // Toggle mark type
      editor.toggleMark(type);
    }
  };
}

export default MarkHotKey;
