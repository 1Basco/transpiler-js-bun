export interface Visitor {
  visitFile(node: File): any;
  visitFunction(node: Function): any;
  visitLet(node: Let): any;
  visitCall(node: Call): any;
  visitBinary(node: Binary): any;
  visitIf(node: If): any;
  visitPrint(node: Print): any;
  visitBinaryOp(node: unknown): any;
  visitVar(node: Var): any;
  visitInt(node: Int): any;
  visitStr(node: Str): any;
  visitTuple(node: Tuple): any;
  visitFirst(node: First): any;
  visitSecond(node: Second): any;
}

export interface Visitable {
  accept(visitor: Visitor): any;
}

export type Location = {
  start: number;
  end: number;
  filename: string;
};

export type File = {
  kind: "File";
  expression: Term;
  location: Location;
};

export type Parameter = {
  text: string;
  location: Location;
};

export type Var = {
  kind: "Var";
  text: string;
  location: Location;
};

export type Function = {
  kind: "Function";
  parameters: Array<Parameter>;
  value: Term;
  location: Location;
};

export type Call = {
  kind: "Call";
  callee: Term;
  arguments: Array<Term>;
  location: Location;
};

export type Let = {
  kind: "Let";
  name: Parameter;
  value: Term;
  next: Term;
  location: Location;
};

export type Str = {
  kind: "Str";
  value: string;
  location: Location;
};

export type Int = {
  kind: "Int";
  value: number;
  location: Location;
};

export type Bool = {
  kind: "Bool";
  value: boolean;
  location: Location;
};

export type If = {
  kind: "If";
  condition: Term;
  then: Term;
  otherwise: Term;
  location: Location;
};

export type Binary = {
  kind: "Binary";
  lhs: Term;
  op: BinaryOp;
  rhs: Term;
  location: Location;
};

export type Tuple = {
  kind: "Tuple";
  first: Term;
  second: Term;
  location: Location;
};

export type First = {
  kind: "First";
  value: Tuple;
  location: Location;
};

export type Second = {
  kind: "Second";
  value: Tuple;
  location: Location;
};

export type Print = {
  kind: "Print";
  value: Term;
  location: Location;
};

export type Term =
  | Int
  | Str
  | Call
  | Var
  | Function
  | Call
  | Let
  | Binary
  | If
  | Print
  | First
  | Second
  | Tuple
  | Bool;

export enum BinaryOp {
  Add = "+",
  Sub = "-",
  Mul = "*",
  Div = "/",
  Rem = "%",
  Eq = "==",
  Neq = "!=",
  Lt = "<",
  Gt = ">",
  Lte = "<=",
  Gte = ">=",
  And = "&&",
  Or = "||",
}
