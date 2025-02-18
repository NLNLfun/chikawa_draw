// 定義 Shape 類別
class Shape {
  constructor(length) {
    this.length = length;
  }

  // 計算周長的方法（父類別方法，可被子類別繼承）
  calcPerimeter() {
    return this.length * 4; // 這裡假設為正方形的周長公式，子類別會覆寫此方法
  }
}

// 定義 Square 類別，繼承自 Shape
class Square extends Shape {
  constructor(side) {
    super(side); // 使用父類別的建構子來設置邊長
  }

  // 覆寫計算周長的方法
  calcPerimeter() {
    return this.length * 4; // 正方形周長：4 * 邊長
  }

  // 定義計算面積的方法
  calcArea() {
    return this.length * this.length; // 正方形面積：邊長的平方
  }
}

// 定義 Triangle 類別，繼承自 Shape
class Triangle extends Shape {
  constructor(side) {
    super(side); // 使用父類別的建構子來設置邊長
  }

  // 覆寫計算周長的方法
  calcPerimeter() {
    return this.length * 3; // 三角形周長（假設為等邊三角形）：3 * 邊長
  }

  // 定義計算面積的方法
  calcArea() {
    return (Math.sqrt(3) / 4) * this.length * this.length; // 等邊三角形面積公式
  }
}

// 測試程式碼
let triangle = new Triangle(5);
let square = new Square(10);

console.log("The perimeter of triangle is:", triangle.calcPerimeter());
console.log("The area of triangle is:", triangle.calcArea());

console.log("The perimeter of square is:", square.calcPerimeter());
console.log("The area of square is:", square.calcArea());
