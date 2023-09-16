import {
  Binary,
  BinaryOp,
  Call,
  File,
  First,
  Function,
  If,
  Int,
  Let,
  Parameter,
  Print,
  Second,
  Str,
  Tuple,
  Var,
  Visitor,
} from "./types";

export default class TreeTraversalVisitor implements Visitor {
  visitFile(node: File) {
    this.visit(node.expression);
  }

  visitFunction(node: Function) {
    const params: Array<Parameter> = node.parameters.map((param: any) => {
      return param.text;
    });

    return `(${params.join(", ")}) => {
    ${this.visit(node.value)}
    }`;
  }

  visitLet(node: Let) {
    const nextStructure = this.visit(node.value);

    return node.next
      ? `const ${node.name.text} = ${nextStructure} 
      \n ${this.visit(node.next)}`
      : `const ${node.name.text} = ${nextStructure}`;
  }

  visitCall(node: Call) {
    return `${this.visit(node.callee)}(${node.arguments
      .map((arg: any) => this.visit(arg))
      .join(", ")})`;
  }

  visitBinary(node: Binary) {
    return `${this.visit(node.lhs)} ${this.visitBinaryOp(node.op)} ${this.visit(
      node.rhs
    )}`;
  }

  visitIf(node: If) {
    return `if(${this.visit(node.condition)}) {
    return ${this.visit(node.then)}
  } ${
    node.otherwise
      ? `else {
    return ${this.visit(node.otherwise)}
  }`
      : ""
  }`;
  }

  visitPrint(node: Print) {
    return `console.log(${this.visit(node.value)});`;
  }

  visitBinaryOp(node: unknown) {
    return BinaryOp[node as keyof typeof BinaryOp];
  }

  visitVar(node: Var) {
    return `${node.text}`;
  }

  visitInt(node: Int) {
    return node.value;
  }

  visitStr(node: Str) {
    return `"${node.value}"`;
  }

  visitTuple(node: Tuple) {
    return `[${this.visit(node.first)}, ${this.visit(node.second)}]`;
  }

  visitFirst(node: First) {
    return `${this.visit(node.value)}[0]`;
  }

  visitSecond(node: Second) {
    return `${this.visit(node.value)}[1]`;
  }

  visit(node: any): any {
    switch (node.kind) {
      case "Let": {
        return this.visitLet(node);
      }
      case "Function": {
        return this.visitFunction(node);
      }
      case "If": {
        return this.visitIf(node);
      }
      case "Binary": {
        return this.visitBinary(node);
      }
      case "BinaryOp": {
        return this.visitBinaryOp(node);
      }
      case "Var": {
        return `${node.text}`;
      }
      case "Int": {
        return node.value;
      }
      case "Call": {
        return this.visitCall(node);
      }
      case "Print": {
        return this.visitPrint(node);
      }
      case "Str": {
        return this.visitStr(node);
      }
      case "Tuple": {
        return this.visitTuple(node);
      }
      case "First": {
        return this.visitFirst(node);
      }
      case "Second": {
        return this.visitSecond(node);
      }
      default: {
        if (node.next) {
          return this.visit(node.next);
        } else {
          return "";
        }
      }
    }
  }
}
