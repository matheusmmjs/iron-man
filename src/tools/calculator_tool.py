from typing import Any, Dict
from .base_tool import BaseTool

class CalculatorTool(BaseTool):
    """A tool for performing basic mathematical calculations."""
    
    @property
    def name(self) -> str:
        return "calculator"
    
    @property
    def description(self) -> str:
        return "Performs basic mathematical calculations (addition, subtraction, multiplication, division)"
    
    def run(self, **kwargs: Any) -> Dict[str, Any]:
        operation = kwargs.get("operation")
        num1 = kwargs.get("num1")
        num2 = kwargs.get("num2")
        
        if not all([operation, num1, num2]):
            return {"error": "Missing required parameters"}
        
        try:
            if operation == "add":
                result = num1 + num2
            elif operation == "subtract":
                result = num1 - num2
            elif operation == "multiply":
                result = num1 * num2
            elif operation == "divide":
                if num2 == 0:
                    return {"error": "Division by zero"}
                result = num1 / num2
            else:
                return {"error": f"Unsupported operation: {operation}"}
            
            return {"result": result, "operation": operation}
            
        except Exception as e:
            return {"error": str(e)} 