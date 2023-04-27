class Interpreter {
  constructor() {
    this.vars = {};
  }
  static tokenize(program) {
    const regex = /\s*([-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return program.split(regex).filter( s => /\S/.test(s) );
  }
  input(expr) {
    const tokens = Interpreter.tokenize(expr);    
    
    let stack = [];
    let queue = [];
    
    if(tokens.length == 0)
      return '';
    
    let len = tokens.length;
    for(let i = 0; i < len; i++)
    {
      let ch = tokens[i];
      if(ch == '(')
    	  stack.push(ch);
      else if(ch  == ')')
      {
          while(stack.length && stack[stack.length - 1] != '(')
			      queue.push(stack.pop());
    	    stack.pop();
      }
      else if(ch >= '0' && ch <= '9')
        queue.push(+ch);
      else if(ch >= 'a' && ch <= 'z')
      {
        if(this.vars.hasOwnProperty(ch))
        {
          if(this.vars[ch] == undefined)
            queue.push(ch);
          else 
            queue.push(this.vars[ch]);
        }
        else
        {
          this.vars[ch] = undefined;
          queue.push(ch);
        }
      }
      else
      {
        if(precedence(ch) > precedence(stack[stack.length - 1]))
            stack.push(ch);
        else
        {
          while(stack.length && precedence(ch) <= precedence(stack[stack.length - 1]))
            queue.push(stack.pop());
          stack.push(ch);
        }
      }
    }
  
	while(stack.length)
      queue.push(stack.pop());
    
    const ops = {'+' : (a, b) => a + b, '-' : (a, b) => b - a,
                 '*' : (a, b) => a * b, '/' : (a, b) => b / a, '%' : (a, b) => b % a,
                 '=' : (a, b) => {this.vars[b] = a; return this.vars[b];}};
    
    let res = [];
    
    for(let q of queue)
    {
      
      if(q >= 'a' && q <= 'z')
        res.push(q)
      else if(isNaN(q))
      {
        let a = res.pop();
        let b = res.pop();
                
        res.push(ops[q](a, b));
      }
      else
        res.push(q);
      
    }

    let z = res.pop();
    
    if(z >= 'a' && z < 'z')
      throw "error";
    
    return z;
  }
}

function precedence(op)
{
  switch(op)
  {
      case '(':
      return -1;
      case '+':
      case '-':
      return 2;
      case '*':
      case '/':
      case '%':
      return 3;
      case '=':
      return 0;
  }
}
