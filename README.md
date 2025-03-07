# LangChain Agent with Custom Tools

This project implements a LangChain agent with custom tools following SOLID principles. The agent can use various tools to perform different tasks, such as calculations and text processing.

## Features

- Modular tool system following SOLID principles
- Calculator tool for basic mathematical operations
- Text processor tool for text manipulation
- Easy to extend with new tools
- LangChain integration for natural language processing

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

Run the main script:
```bash
python src/main.py
```

The agent can handle various requests, such as:
- "Calculate 5 plus 3"
- "Count the words in 'Hello, world!'"
- "Convert 'Hello, world!' to uppercase"

## Project Structure

```
src/
├── agents/
│   └── langchain_agent.py
├── tools/
│   ├── base_tool.py
│   ├── calculator_tool.py
│   ├── text_processor_tool.py
│   └── tool_manager.py
└── main.py
```

## Adding New Tools

To add a new tool:

1. Create a new class in the `tools` directory that inherits from `BaseTool`
2. Implement the required methods: `name`, `description`, and `run`
3. Register the tool in `main.py`

## SOLID Principles Applied

- **Single Responsibility Principle**: Each tool has a single responsibility
- **Open/Closed Principle**: New tools can be added without modifying existing code
- **Liskov Substitution Principle**: All tools can be used interchangeably through the base interface
- **Interface Segregation Principle**: Tools only implement the methods they need
- **Dependency Inversion Principle**: High-level modules depend on abstractions 