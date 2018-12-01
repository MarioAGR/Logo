/**
 * This instance of the CommandLookUp class will be the global variable
 * that will store all the commands available.
 */
const commandLookUp = new CommandLookUp();
const colors = {
  static: {
    black: '#000000',
    blue: '#0000FF',
    green: '#008000',
    cyan: '#00FFFF',
    red: '#FF0000',
    magenta: '#FF00FF',
    yellow: '#FFFF00',
    white: '#FFFFFF'
  },
  changable: {
    brown: '#A52A2A',
    tan: '#D2B48C',
    forest: '#228B22',
    aqua: '#00FFFF',
    salmon: '#FA8072',
    purple: '#800080',
    orange: '#FFA500',
    grey: '#808080'
  }
};

/**
 * To add a new command, just need the name, the arguments,
 * and then the function to execute.
 * Note: When adding a new command, update the list of supported commands on the readme file
 */
commandLookUp.add(
  new Command("fd", [new CommandArg("value", ARGUMENT_TYPES.EXPRESSION)], value => {
    turtle.forward(value);
  })
);

commandLookUp.add(
  new Command("bk", [new CommandArg("value", ARGUMENT_TYPES.EXPRESSION)], value => {
    turtle.forward(-value);
  })
);

commandLookUp.add(
  new Command("rt", [new CommandArg("value", ARGUMENT_TYPES.EXPRESSION)], value => {
    turtle.right(value);
  })
);

commandLookUp.add(
  new Command("lt", [new CommandArg("value", ARGUMENT_TYPES.EXPRESSION)], value => {
    turtle.right(-value);
  })
);

commandLookUp.add(
  new Command("pu", [], () => {
    turtle.pen = false;
  })
);

commandLookUp.add(
  new Command("pd", [], () => {
    turtle.pen = true;
  })
);

commandLookUp.add(
  new Command(
    "pensize",
    [new CommandArg("size", ARGUMENT_TYPES.EXPRESSION)],
    size => {
      turtle.strokeWeight = size;
    }
  )
);

commandLookUp.add(
  new Command(
    "setxy",
    [
      new CommandArg("x", ARGUMENT_TYPES.EXPRESSION),
      new CommandArg("y", ARGUMENT_TYPES.EXPRESSION)
    ],
    (x, y) => {
      turtle.x = x;
      turtle.y = y;
    }
  )
);

commandLookUp.add(
  new Command("setx", [new CommandArg("x", ARGUMENT_TYPES.EXPRESSION)], x => {
    turtle.x = x;
  })
);

commandLookUp.add(
  new Command("sety", [new CommandArg("y", ARGUMENT_TYPES.EXPRESSION)], y => {
    turtle.y = y;
  })
);

commandLookUp.add(
  new Command("home", [], () => {
    turtle["home"]();
  })
);

commandLookUp.add(
  new Command("radians", [], () => {
    angleMode(RADIANS);
  })
);

commandLookUp.add(
  new Command("degrees", [], () => {
    angleMode(DEGREES);
  })
);

commandLookUp.add(
  new Command(
    "repeat",
    [
      new CommandArg("lengthLoop", ARGUMENT_TYPES.INT),
      new CommandArg("commands", ARGUMENT_TYPES.COMMANDS)
    ],
    function(lengthLoop, commands) {
      for (let i = 0; i < lengthLoop; i++) {
        for (let cmd of commands) {
          cmd.execute(i + 1);
        }
      }
    }
  )
);

/**
 * Color, added as example. Given a value, it set the stroke.
 */
commandLookUp.add(
  new Command("color", [new CommandArg("color", ARGUMENT_TYPES.STR,(str)=>{
    return /^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3}|([0-9]|1[0-5]))$/.test(str);
  })], color => {
    if (color.length === 1 | color.length === 2) {
      switch (color) {
        case '0':
          color = colors.static.black;
          break;
        case '1':
          color = colors.static.blue;
          break;
        case '2':
          color = colors.static.green;
          break;
        case '3':
          color = colors.static.cyan;
          break;
        case '4':
          color = colors.static.red;
          break;
        case '5':
          color = colors.static.magenta;
          break;
        case '6':
          color = colors.static.yellow;
          break;
        case '7':
          color = colors.static.white;
          break;
        case '8':
          color = colors.changable.brown;
          break;
        case '9':
          color = colors.changable.tan;
          break;
        case '10':
          color = colors.changable.forest;
          break;
        case '11':
          color = colors.changable.aqua;
          break;
        case '12':
          color = colors.changable.salmon;
          break;
        case '13':
          color = colors.changable.purple;
          break;
        case '14':
          color = colors.changable.orange;
          break;
        case '15':
          color = colors.changable.grey;
          break;
      }
    } else {
      // sanity sake let you use hex without the need for #
      if (color[0] != "#") {
        color = "#" + color;
      }
    }

    turtle.strokeColor = color;
  })
);

/*
 * Not apart of logo this allows us to use a RGB instead of HEX
 * Though not standard in logo this just gives us a slightly more fine grain color
 */
commandLookUp.add(
  new Command(
    "colorrgb",
    [new CommandArg("params", ARGUMENT_TYPES.PARAMETERS)],
    params => {
      let [r, g, b] = params;
      r = parseInt(r);
      g = parseInt(g);
      b = parseInt(b);

      if (r > 255) {
        r = 255;
      }
      if (r < 0) {
        r = 0;
      }

      if (g > 255) {
        g = 255;
      }
      if (g < 0) {
        g = 0;
      }

      if (b > 255) {
        b = 255;
      }
      if (r < 0) {
        b = 0;
      }

      turtle.strokeColor = color(r, g, b);
    }
  )
);

/**
 * Added as example of taking [...] as not only commands
 * but strings you can later process.
 * This command expects 3 args separated by spaces.
 */
commandLookUp.add(
  new Command(
    "author",
    [new CommandArg("params", ARGUMENT_TYPES.PARAMETERS)],
    params => {
      const [author, website, twitter] = params;
      console.log("This repository has been created by:");
      console.log(`${author} (@${twitter}) - ${website}`);
    }
  )
);
