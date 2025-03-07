from typing import Dict, List, Type
from .base_tool import BaseTool

class ToolManager:
    """Manages the registration and execution of tools."""
    
    def __init__(self):
        self._tools: Dict[str, BaseTool] = {}
    
    def register_tool(self, tool: BaseTool) -> None:
        """Register a new tool.
        
        Args:
            tool: An instance of a tool that inherits from BaseTool.
        """
        self._tools[tool.name] = tool
    
    def get_tool(self, tool_name: str) -> BaseTool:
        """Get a tool by name.
        
        Args:
            tool_name: The name of the tool to retrieve.
            
        Returns:
            The requested tool instance.
            
        Raises:
            KeyError: If the tool is not found.
        """
        return self._tools[tool_name]
    
    def list_tools(self) -> List[Dict[str, str]]:
        """List all registered tools and their descriptions.
        
        Returns:
            A list of dictionaries containing tool names and descriptions.
        """
        return [
            {"name": name, "description": tool.description}
            for name, tool in self._tools.items()
        ]
    
    def execute_tool(self, tool_name: str, **kwargs) -> Dict:
        """Execute a tool with the given parameters.
        
        Args:
            tool_name: The name of the tool to execute.
            **kwargs: Parameters to pass to the tool.
            
        Returns:
            The result of the tool execution.
            
        Raises:
            KeyError: If the tool is not found.
        """
        tool = self.get_tool(tool_name)
        return tool.run(**kwargs) 