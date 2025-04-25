//% color="#9932CC" iconWidth=50 iconHeight=40
namespace ywdcargame {
  //% block="Read the ultrasonic sensor distance [UNIT]"  blockType="reporter"
  //% UNIT.shadow="dropdown" UNIT.options="UNIT"
  export function readUnit(parameter: any) {
    let unit = parameter.UNIT.code;

    Generator.addInclude('DFRobot_URM10', '#include <DFRobot_URM10.h>');
    Generator.addObject(`urm10`, `DFRobot_URM10`, `urm10;`);
    Generator.addCode(`(urm10.getDistance${unit}(3, 2))`);
  }

  //% block="BlueTooth initialization" blockType="command"
  export function initBlueTooth() {
    Generator.addInclude('string_comdata', `String comdata = "";`)
    Generator.addSetup(`Serial2.begin`, `Serial2.begin(9600);`);
    Generator.addCode([
      `while (Serial2.available() > 0) {\n` +
      `     comdata += char(Serial2.read());\n` +
      `     delay(2);\n` +
      `  }`,
      Generator.ORDER_UNARY_POSTFIX
    ])
  }

  //% block="Read bluetooth is [BL]" blockType="boolean"
  //% BL.shadow="dropdown" BL.options="BL_OPTIONS_TEMP"
  export function readBlueTooth(param: any) {
    let bl = param.BL.code
    Generator.addCode([`(comdata.length() > 0) && (comdata==String("${bl}"))`, Generator.ORDER_UNARY_POSTFIX])
  }

  //% block="clear comdata" blockType="command"
  export function clearComdata() {
    Generator.addCode(`comdata = "";`);
  }

  //% block="Start bluetooth" blockType="command"
  export function startBluetooth() {
    Generator.addInclude('string_comdata', `String comdata = "";`)
    Generator.addInclude('volatile_float_sudu', `volatile float ywt_variable_speed_n;`)
    // 函数声明
    Generator.addInclude('DF_HouZuo_YWT_declare', `void DF_HouZuo_YWT();`)
    Generator.addInclude('DF_HouYou_YWT_declare', `void DF_HouYou_YWT();`)
    Generator.addInclude('DF_QianZuo_YWT_declare', `void DF_QianZuo_YWT();`)
    Generator.addInclude('DF_QianYou_YWT_declare', `void DF_QianYou_YWT();`)
    Generator.addInclude('DF_ZuoZhuan_YWT_declare', `void DF_ZuoZhuan_YWT();`)
    Generator.addInclude('DF_YouZhuan_YWT_declare', `void DF_YouZhuan_YWT();`)
    Generator.addInclude('DF_HouTui_YWT_declare', `void DF_HouTui_YWT();`)
    Generator.addInclude('DF_QianJin_YWT_declare', `void DF_QianJin_YWT();`)
    // 自定义函数
    Generator.addInclude('DF_HouZuo_YWT_function', `void DF_HouZuo_YWT() {\n` +
      `  Serial1.println(String("M_SR(0, ") + String(ywt_variable_speed_n).toInt() + String(", 0,") + String((ywt_variable_speed_n + 15)).toInt() + String(")"));\n` +
      `}`
    )
    Generator.addInclude('DF_HouYou_YWT_function', `void DF_HouYou_YWT() {\n` +
      `  Serial1.println(String("M_SR(0, ") + String((ywt_variable_speed_n + 15)).toInt() + String(", 0,") + String(ywt_variable_speed_n).toInt() + String(")"));\n` +
      `}`
    )
    Generator.addInclude('DF_QianZuo_YWT_function', `void DF_QianZuo_YWT() {\n` +
      `  Serial1.println(String("M_SR(1, ") + String(ywt_variable_speed_n).toInt() + String(", 1,") + String((ywt_variable_speed_n + 15)).toInt() + String(")"));\n` +
      `}`
    )
    Generator.addInclude('DF_QianYou_YWT_function', `void DF_QianYou_YWT() {\n` +
      `  Serial1.println(String("M_SR(1, ") + String((ywt_variable_speed_n + 15)).toInt() + String(", 1,") + String(ywt_variable_speed_n).toInt() + String(")"));\n` +
      `}`
    )
    Generator.addInclude('DF_ZuoZhuan_YWT_function', `void DF_ZuoZhuan_YWT() {\n` +
      `  Serial1.println(String("M_SR(0, ") + String((ywt_variable_speed_n - 20)).toInt() + String(", 1,") + String((ywt_variable_speed_n - 20)).toInt() + String(")"));\n` +
      `}`
    )
    Generator.addInclude('DF_YouZhuan_YWT_function', `void DF_YouZhuan_YWT() {\n` +
      `  Serial1.println(String("M_SR(1, ") + String((ywt_variable_speed_n - 20)).toInt() + String(", 0,") + String((ywt_variable_speed_n - 20)).toInt() + String(")"));\n` +
      `}`
    )
    Generator.addInclude('DF_HouTui_YWT_function', `void DF_HouTui_YWT() {\n` +
      `  Serial1.println(String("M_SR(0, ") + String(ywt_variable_speed_n).toInt() + String(", 0,") + String(ywt_variable_speed_n).toInt() + String(")"));\n` +
      `}`
    )
    Generator.addInclude('DF_QianJin_YWT_function', `void DF_QianJin_YWT() {\n` +
      `  Serial1.println(String("M_SR(1, ") + String(ywt_variable_speed_n).toInt() + String(", 1,") + String(ywt_variable_speed_n).toInt() + String(")"));\n` +
      `}`
    )
    // 初始化
    Generator.addSetup(`Serial2_begin_9600`, `Serial2.begin(9600);`);
    Generator.addSetup(`Serial1_begin_115200`, `Serial1.begin(115200);`);
    Generator.addSetup(`pinMode_18_output`, `pinMode(18, OUTPUT);`);
    Generator.addSetup(`speed_setup`, `ywt_variable_speed_n = 40;`);
    // 追加代码
    Generator.addCode([
      `while (Serial2.available() > 0) {\n` +
      `    comdata += char(Serial2.read());\n` +
      `    delay(2);\n` +
      `  }`,
      Generator.ORDER_UNARY_POSTFIX
    ])
    Generator.addCode(`if (comdata.length() > 0){\n` +
      `    if (comdata==String("BLE_Forward")) {\n` +
      `      DF_QianJin_YWT();\n` +
      `    }\n` +
      `    if (comdata==String("BLE_Left")) {\n` +
      `      DF_ZuoZhuan_YWT();\n` +
      `    }\n` +
      `    if (comdata==String("BLE_Right")) {\n` +
      `      DF_YouZhuan_YWT();\n` +
      `    }\n` +
      `    if (comdata==String("BLE_Backward")) {\n` +
      `      DF_HouTui_YWT();\n` +
      `    }\n` +
      `    if (comdata==String("BLE_Forward_Left")) {\n` +
      `      DF_QianZuo_YWT();\n` +
      `    }\n` +
      `    if (comdata==String("BLE_Forward_Right")) {\n` +
      `      DF_QianYou_YWT();\n` +
      `    }\n` +
      `    if (comdata==String("BLE_Backward_Right")) {\n` +
      `      DF_HouZuo_YWT();\n` +
      `    }\n` +
      `    if (comdata==String("BLE_Backward_Left")) {\n` +
      `      DF_HouYou_YWT();\n` +
      `    }\n` +
      `    if ((comdata==String("BLE_Accelerate")) && (ywt_variable_speed_n < 60)) {\n` +
      `      ywt_variable_speed_n += 5;\n` +
      `      analogWrite(18, 235);\n` +
      `      delay(200);\n` +
      `      analogWrite(18, 0);\n` +
      `    }\n` +
      `    if ((comdata==String("BLE_Moderate")) && (ywt_variable_speed_n > 35)) {\n` +
      `      ywt_variable_speed_n -= 5;\n` +
      `      analogWrite(18, 128);\n` +
      `      delay(200);\n` +
      `      analogWrite(18, 0);\n` +
      `    }\n` +
      `    if (comdata==String("BLE_3")) {\n` +
      `      Serial1.println(String("M_SR(0, ") + String(35).toInt() + String(", 1,") + String(35).toInt() + String(")"));\n` +
      `      delay(430);\n` +
      `      Serial1.println("M_SR(0, 0, 0, 0)");\n` +
      `    }\n` +
      `    if (comdata==String("BLE_4")) {\n` +
      `      Serial1.println(String("M_SR(1, ") + String(35).toInt() + String(", 0,") + String(35).toInt() + String(")"));\n` +
      `      delay(430);\n` +
      `      Serial1.println("M_SR(0, 0, 0, 0)");\n` +
      `    }\n` +
      `    if (comdata==String("BLE_Stop")) {\n` +
      `      Serial1.println("M_SR(0, 0, 0, 0)");\n` +
      `    }\n` +
      `    comdata = "";\n` +
      `  }`
    )
  }

  //% block="LED [STATE]" blockType="command"
  //% STATE.shadow="dropdown" STATE.options="STATE_OPTIONS"
  export function ledState(param: any) {
    let status = param.STATE.code;
    Generator.addSetup(`pinMode_16_output`, `pinMode(16, OUTPUT);`);
    Generator.addCode(`digitalWrite(16, ${status});`);
  }

  // //% block="infrared value is [KEY]"  blockType="reporter"
  // //% KEY.shadow="dropdown" KEY.options="KEY_OPTIONS"
  // export function infraredValue(parameter: any) {
  //   let key = parameter.KEY.code;
  //   Generator.addCode(`String("${key}")`);
  // }

  //% block="init the RGB light" blockType="command"
  export function initLed() {
    Generator.addInclude('DFRobot_NeoPixel', '#include <DFRobot_NeoPixel.h>');
    Generator.addObject(`neoPixel_17`, `DFRobot_NeoPixel`, `neoPixel_17;`);
    Generator.addSetup(`neoPixel_17.begin`, `neoPixel_17.begin(17, 6);`);
  }

  //% block="RGB light Set the brightness of the pin light to [SR]" blockType="command"
  //% SR.shadow="range"   SR.params.min=0    SR.params.max=255    SR.defl=255
  export function setLight(parameter: any, block: any) {
    let light = parameter.SR.code;
    Generator.addCode(`neoPixel_17.setBrightness(${light});`);
  }

  //% block="RGB light pin [NUM] display [COLOR]" blockType="command"
  //% NUM.shadow="dropdown" NUM.options="NUM_OPTIONS"
  //% COLOR.shadow="colorPalette"
  export function setColor(parameter: any, block: any) {
    let num = parameter.NUM.code;
    let color = parameter.COLOR.code;

    if (num === 'All') {
      Generator.addCode(`neoPixel_17.setRangeColor(${0}, ${2}, ${color});`);
    } else {
      Generator.addCode(`neoPixel_17.setRangeColor(${num}, ${num}, ${color});`);
    }
  }

  //% block="[NUM1] to [NUM2] [LIGHT1] to [LIGHT2]" blockType="command"
  //% NUM1.shadow="range"   NUM1.params.min=1    NUM1.params.max=3    NUM1.defl=1
  //% NUM2.shadow="range"   NUM2.params.min=1    NUM2.params.max=3    NUM2.defl=3
  //% LIGHT1.shadow="range"   LIGHT1.params.min=1    LIGHT1.params.max=360    LIGHT1.defl=1
  //% LIGHT2.shadow="range"   LIGHT2.params.min=1    LIGHT2.params.max=360    LIGHT2.defl=360
  export function gradientColor(params: any) {
    let num1 = params.NUM1.code;
    let num2 = params.NUM2.code;
    let light1 = params.LIGHT1.code;
    let light2 = params.LIGHT2.code;

    Generator.addCode(`neoPixel_17.showRainbow(${num1 - 1}, ${num2 - 1}, ${light1}, ${light2});`);
  }

  //% block="All RGB lamp pin are off" blockType="command"
  export function clearAll(parameter: any, block: any) {
    Generator.addCode(`neoPixel_17.clear();`);
  }

  //% block="Key module [STATE]" blockType="boolean"
  //% STATE.shadow="dropdown"  STATE.options="STATE"
  export function keyModule(parameter: any) {
    let state = parameter.STATE.code;
    Generator.addSetup(`pinMode_19_input`, `pinMode(19, INPUT);`);
    Generator.addCode([`digitalRead(19) == ${state}`, Generator.ORDER_UNARY_POSTFIX]);
  }

  //% block="Buzzer [STATUS]" blockType="command"
  //% STATUS.shadow="dropdown" STATUS.options="STATUS_OPTIONS"
  export function buzzerStatus(parameter: any) {
    let status = parameter.STATUS.code;
    Generator.addSetup(`pinMode_18_output`, `pinMode(18, OUTPUT);`);
    Generator.addCode(`analogWrite(18, ${status});`);
  }

  //% block="set pwm output [SR]" blockType="command"
  //% SR.shadow="range"   SR.params.min=0    SR.params.max=255    SR.defl=255
  export function setPwm(parameter: any) {
    let sr = parameter.SR.code;
    Generator.addCode(`analogWrite(18, ${sr});`);
  }

  //% block="Line patrol [DIRECTION]" blockType="boolean"
  //% DIRECTION.shadow="dropdown" DIRECTION.options="DIRECTION_OPTIONS"
  export function setDirection(parameter: any) {
    let direction = parameter.DIRECTION.code;
    Generator.addSetup(`pinMode_${direction}_input`, `pinMode(${direction}, INPUT);`);
    Generator.addCode(`digitalRead(${direction})`);
  }

  //% block="Line patrol [DIRECTION] hit black line" blockType="boolean"
  //% DIRECTION.shadow="dropdown" DIRECTION.options="DIRECTION_OPTIONS"
  export function hitBlackLine(parameter: any) {
    let direction = parameter.DIRECTION.code;
    Generator.addSetup(`pinMode_${direction}_input`, `pinMode(${direction}, INPUT);`);
    Generator.addCode([`digitalRead(${direction}) == 1`, Generator.ORDER_UNARY_POSTFIX]);
  }

  //% block="Line patrol [DIRECTION] hit white line" blockType="boolean"
  //% DIRECTION.shadow="dropdown" DIRECTION.options="DIRECTION_OPTIONS"
  export function hitWhiteLine(parameter: any) {
    let direction = parameter.DIRECTION.code;
    Generator.addSetup(`pinMode_${direction}_input`, `pinMode(${direction}, INPUT);`);
    Generator.addCode([`digitalRead(${direction}) == 0`, Generator.ORDER_UNARY_POSTFIX]);
  }

  //% block="init motor" blockType="command"
  // export function initMotor(parameter: any, block: any) {
  //   Generator.addSetup(`Serial1_begin_115200`, `Serial1.begin(115200);`);
  // }

  //% block="Left motor [BEARING1] [SPEED1] right motor [BEARING2] [SPEED2]" blockType="command"
  //% BEARING1.shadow="dropdown" BEARING1.options="BEARING_OPTIONS"
  //% BEARING2.shadow="dropdown" BEARING2.options="BEARING_OPTIONS"
  //% SPEED1.shadow="range"   SPEED1.params.min=0    SPEED1.params.max=100    SPEED1.defl=50
  //% SPEED2.shadow="range"   SPEED2.params.min=0    SPEED2.params.max=100    SPEED2.defl=50
  export function setMotor(parameter: any) {
    let bearing1 = parameter.BEARING1.code;
    let bearing2 = parameter.BEARING2.code;
    let speed1 = parameter.SPEED1.code;
    let speed2 = parameter.SPEED2.code;

    let leftOne = 0, leftTwo = 0, rightOne = 0, rightTwo = 0;

    if (bearing1 === 'forword') {
      leftOne = 1
      // leftTwo = 0
    } else if (bearing1 === 'back') {
      leftOne = 0
      // leftTwo = 1
    }

    if (bearing2 === 'forword') {
      rightOne = 1
      // rightTwo = 0
    } else if (bearing2 === 'back') {
      rightOne = 0
      // rightTwo = 1
    }

    // Generator.addSetup(`pinMode_11_output`, `pinMode(${11}, OUTPUT);`);
    // Generator.addSetup(`pinMode_12_output`, `pinMode(${12}, OUTPUT);`);
    // Generator.addSetup(`pinMode_14_output`, `pinMode(${14}, OUTPUT);`);
    // Generator.addSetup(`pinMode_13_output`, `pinMode(${13}, OUTPUT);`);

    // Generator.addCode(`analogWrite(10, ${speed1});`);
    // Generator.addCode(`digitalWrite(11, ${leftOne});`);
    // Generator.addCode(`digitalWrite(12, ${leftTwo});`);
    // Generator.addCode(`analogWrite(15, ${speed2});`);
    // Generator.addCode(`digitalWrite(14, ${rightOne});`); 
    // Generator.addCode(`digitalWrite(13, ${rightTwo});`);
    Generator.addSetup(`Serial1_begin_115200`, `Serial1.begin(115200);`);
    Generator.addCode(`Serial1.println(String("M_SR(${leftOne}, ") + String(${speed1}).toInt() + String(", ${rightOne},") + String(${speed2}).toInt() + String(")"));`)
    Generator.addCode(`delay(10);`)
  }

  //% block="Motor stop" blockType="command"
  export function stopMotor(parameter: any) {
    // Generator.addCode(`digitalWrite(11, ${1});`);
    // Generator.addCode(`digitalWrite(12, ${1});`);
    // Generator.addCode(`digitalWrite(14, ${1});`);
    // Generator.addCode(`digitalWrite(13, ${1});`);
    Generator.addCode(`Serial1.println("M_SR(0, 0, 0, 0)");`)
    Generator.addCode(`delay(10);`)
  }

  //% block="encoder motor [SPEED]" blockType="command"
  //% SPEED.shadow="range"   SPEED.params.min=0    SPEED.params.max=100    SPEED.defl=50
  export function initEncoderMotor(parameter: any) {
    let speed = parameter.SPEED.code;

    Generator.addSetup(`Serial1_begin_115200`, `Serial1.begin(115200);`);
    Generator.addCode(`Serial1.println(String("M_SL(") + String(${speed}).toInt() + String(")"));`)
  }

  //% block="Set the serial port MP3 module playback mode to [STATUS]" blockType="command"
  //% STATUS.shadow="dropdown" STATUS.options="MP3_STATUS_OPTIONS"
  export function setMP3Status(parameter: any) {
    let status = parameter.STATUS.code;

    Generator.addCode(`Serial1.begin(9600);`)
    Generator.addCode(`delay(10);`)
    Generator.addCode(`Serial1.write(126);`)
    Generator.addCode(`Serial1.write(2);`)
    Generator.addCode(`Serial1.write(${status});`)
    Generator.addCode(`Serial1.write(239);`)
    Generator.addCode(`delay(10);`)
    Generator.addCode(`Serial1.begin(115200);`)
    Generator.addCode(`delay(10);`)
  }
}