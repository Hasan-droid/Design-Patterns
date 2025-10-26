interface Tool {
  onMouseDown(): void;
  onMouseUp(): void;
}

class SelectionTool implements Tool {
  onMouseDown(): void {
    console.log(`Selection Started`);
  }

  onMouseUp(): void {
    console.log("Selection Finished");
  }
}

class BrushTool implements Tool {
  onMouseDown(): void {
    console.log(`Start Drawing`);
  }

  onMouseUp(): void {
    console.log("Finish Drawing");
  }
}
class EraserTool implements Tool {
  onMouseDown(): void {
    console.log(`Start Erasing`);
  }

  onMouseUp(): void {
    console.log("Finish Erasing");
  }
}

class Canvas {
  private tool: Tool;

  constructor(tool: Tool) {
    this.tool = tool;
  }
  setTool(tool: Tool) {
    this.tool = tool;
  }

  onMouseDown() {
    this.tool.onMouseDown();
  }

  onMouseUp() {
    this.tool.onMouseUp();
  }
}

const canvas = new Canvas(new BrushTool());
canvas.onMouseDown();
canvas.setTool(new SelectionTool());
canvas.onMouseUp();
canvas.setTool(new EraserTool());
canvas.onMouseDown();
