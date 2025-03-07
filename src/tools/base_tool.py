from abc import ABC, abstractmethod
from typing import Any, Dict

class BaseTool(ABC):
    """Base class for all tools in the system."""
    
    @property
    @abstractmethod
    def name(self) -> str:
        """The name of the tool."""
        pass
    
    @property
    @abstractmethod
    def description(self) -> str:
        """A description of what the tool does."""
        pass
    
    @abstractmethod
    def run(self, **kwargs: Any) -> Dict[str, Any]:
        """Execute the tool's main functionality.
        
        Args:
            **kwargs: Arbitrary keyword arguments for the tool.
            
        Returns:
            Dict[str, Any]: The result of the tool's execution.
        """
        pass 