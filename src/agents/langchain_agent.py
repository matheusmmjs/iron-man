from typing import List
from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from src.tools.tool_manager import ToolManager

class LangChainAgent:
    """A LangChain agent that uses custom tools."""
    
    def __init__(self, tool_manager: ToolManager):
        self.tool_manager = tool_manager
        self.llm = ChatOpenAI(temperature=0)
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        self.agent_executor = self._create_agent()
    
    def _create_agent(self):
        """Create and configure the LangChain agent."""
        
        # Convert our custom tools to LangChain tools
        tools = [
            Tool(
                name=tool.name,
                description=tool.description,
                func=lambda t=tool, **kwargs: t.run(**kwargs)
            )
            for tool in self.tool_manager._tools.values()
        ]
        
        # Create the agent
        return initialize_agent(
            tools,
            self.llm,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            memory=self.memory,
            verbose=True
        )
    
    def run(self, user_input: str) -> str:
        """Run the agent with the given user input.
        
        Args:
            user_input: The user's input text.
            
        Returns:
            The agent's response.
        """
        return self.agent_executor.run(input=user_input) 