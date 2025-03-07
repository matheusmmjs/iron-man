from typing import Any, Dict
from .base_tool import BaseTool

class TextProcessorTool(BaseTool):
    """A tool for processing text with various operations."""
    
    @property
    def name(self) -> str:
        return "text_processor"
    
    @property
    def description(self) -> str:
        return "Performs text processing operations (count words, reverse text, convert case)"
    
    def run(self, **kwargs: Any) -> Dict[str, Any]:
        operation = kwargs.get("operation")
        text = kwargs.get("text")
        
        if not all([operation, text]):
            return {"error": "Missing required parameters"}
        
        try:
            if operation == "count_words":
                result = len(text.split())
            elif operation == "reverse":
                result = text[::-1]
            elif operation == "uppercase":
                result = text.upper()
            elif operation == "lowercase":
                result = text.lower()
            else:
                return {"error": f"Unsupported operation: {operation}"}
            
            return {"result": result, "operation": operation}
            
        except Exception as e:
            return {"error": str(e)} 