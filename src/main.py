import os
from dotenv import load_dotenv
from tools.tool_manager import ToolManager
from tools.calculator_tool import CalculatorTool
from tools.text_processor_tool import TextProcessorTool
from agents.langchain_agent import LangChainAgent

def main():
    # Load environment variables
    load_dotenv()
    
    # Create tool manager
    tool_manager = ToolManager()
    
    # Register tools
    tool_manager.register_tool(CalculatorTool())
    tool_manager.register_tool(TextProcessorTool())
    
    # Create agent
    agent = LangChainAgent(tool_manager)
    
    # Example usage
    while True:
        user_input = input("\nEnter your request (or 'quit' to exit): ")
        if user_input.lower() == 'quit':
            break
            
        try:
            response = agent.run(user_input)
            print("\nAgent's response:", response)
        except Exception as e:
            print(f"\nError: {str(e)}")

if __name__ == "__main__":
    main() 