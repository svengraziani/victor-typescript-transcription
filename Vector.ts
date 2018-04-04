/**
 *  Transcription of the VictorJs Class to TypeScript
 *  Project: http://victorjs.org
 *  Transcription: Sven Graziani
 */

export interface VectorCoordinates{
    x: number,
    y: number
}

export class VectorUtilities{
    public static DEGREES = 180 / Math.PI;
}

export function rad2deg(rad: number){
    return rad * VectorUtilities.DEGREES;
}

export function deg2rad(deg: number){
    return deg / VectorUtilities.DEGREES;
}

export class Vector {
  constructor(public x: number = 0, public y: number = 0) {}

  public addX(v: Vector): Vector {
    this.addScalarX(v.x);
    return this;
  }

  public addY(v: Vector): Vector {
    this.addScalarY(v.y);
    return this;
  }

  public add(v: Vector): Vector {
    this.addScalarX(v.x);
    this.addScalarY(v.y);
    return this;
  }

  public addScalar(scalar: number) {
    this.addScalarX(scalar);
    this.addScalarY(scalar);
    return this;
  }

  public addScalarX(scalar: number) {
    this.x += scalar;
    return this;
  }

  public addScalarY(scalar: number) {
    this.y += scalar;
    return this;
  }

  public subtractX(v: Vector) {
    this.subtractScalarX(v.x);
    return this;
  }

  public subtractY(v: Vector) {
    this.subtractScalarY(v.y);
    return this;
  }

  public subtract(v: Vector) {
    this.subtractScalarX(v.x);
    this.subtractScalarY(v.y);
    return this;
  }

  public subtractScalar(scalar: number) {
    this.subtractScalarX(scalar);
    this.subtractScalarY(scalar);
    return this;
  }

  public subtractScalarX(scalar: number) {
    this.x -= scalar;
    return this;
  }

  public subtractScalarY(scalar: number) {
    this.y -= scalar;
    return this;
  }

  public divideX(v: Vector) {
    this.x /= v.x;
    return this;
  }

  public divideY(v: Vector) {
    this.y /= v.y;
    return this;
  }

  public divide(v: Vector) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }

  public divideScalar(scalar: number) {
    if (scalar !== 0) {
      this.x /= scalar;
      this.y /= scalar;
    } else {
      this.x = 0;
      this.y = 0;
    }
    return this;
  }

  public divideScalarX(scalar: number) {
    scalar !== 0 ? (this.x /= scalar) : (this.x = 0);
    return this;
  }

  public divideScalarY(scalar: number) {
    scalar !== 0 ? (this.y /= scalar) : (this.y = 0);
    return this;
  }

  public invertX() {
    this.x *= -1;
    return this;
  }

  public invertY() {
    this.y *= -1;
    return this;
  }

  public invert() {
    this.invertX();
    this.invertY();
    return this;
  }

  public multiplyX(v: Vector) {
    this.multiplyScalarX(v.x);
    return this;
  }

  public multiplyY(v: Vector) {
    this.multiplyScalarY(v.y);
    return this;
  }

  public multiply(v: Vector) {
    this.multiplyX(v);
    this.multiplyY(v);
    return this;
  }

  public multiplyScalar(scalar) {
    this.multiplyScalarX(scalar);
    this.multiplyScalarY(scalar);
    return this;
  }

  public multiplyScalarX(scalar: number) {
    this.x *= scalar;
    return this;
  }

  public multiplyScalarY(scalar: number) {
    this.y *= scalar;
    return this;
  }

  public normalize() {
    const length = this.length();
    if (length === 0) {
      this.x = 1;
      this.y = 0;
    } else {
      this.divide(new Vector(length, length));
    }
    return this;
  }

  public norm() {
    return this.normalize();
  }

  /**
   * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
   *
   * ### Examples:
   *     var vec = new Vector(100, 50);
   *
   *     vec.limit(80, 0.9);
   *     vec.toString();
   *     // => x:90, y:50
   *
   * @param {Number} max The maximum value for both x and y axis
   * @param {Number} factor Factor by which the axis are to be multiplied with
   * @return {Vector} `this` for chaining capabilities
   * @api public
   */
  public limit(max: number, factor: number) {
    Math.abs(this.x) > max ? (this.x *= factor) : null;
    Math.abs(this.y) > max ? (this.y *= factor) : null;
    return this;
  }

  public round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  public toFixed(precision: number) {
    typeof precision === "undefined" ? (precision = 8) : null;
    return { x: this.x.toFixed(precision), y: this.y.toFixed(precision) };
  }

  public clone(v: Vector){
      return new Vector(this.x, this.y);
  }

  public copyX(v: Vector){
      this.x = v.x;
      return this;
  }

  public copyY(v: Vector){
      this.y = v.y;
      return this;
  }

  public copy(v: Vector){
    this.copyX(v);
    this.copyY(v);
  }

  public zero(){
      this.x = this.y = 0;
      return this;
  }

  public dot(v: Vector){
      return this.x *  v.x + this.y * v.y;
  }

  public cross(v: Vector){
    return (this.x * v.y) - (this.y * v.x);
  }

  public horizontalAngle(){
      return Math.atan2(this.y, this.x);
  }

  public horizontalAngleDeg(){
      return rad2deg(this.horizontalAngle());
  }

  public verticalAngle(){
      return Math.atan2(this.x, this.y);
  }

  public verticalAngleDeg(){
      return rad2deg(this.verticalAngle());
  }

  public angle(){
      return this.horizontalAngle();
  }

  public angleDeg(){
      return this.horizontalAngleDeg();
  }

  public direction(){
      return this.horizontalAngle;
  }

  public rotate(angle: number){
      const nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
      const ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));
      this.x = nx;
      this.y = ny;
      return this;
  }

  public rotateDeg(degrees: number){
      const angle = deg2rad(degrees);
      return this.rotate(angle);
  }

  public rotateTo(rotation: number){
      return this.rotate(rotation - this.angle() );
  }

  public rotateToDeg(deg: number){
    const rotation = deg2rad(deg);
    return this.rotateTo(rotation);
  }

  public rotateBy(rotation: number){
      const angle = this.angle() + rotation;
      return this.rotate(angle);
  }

  public rotateByDeg(deg: number){
    const rotation = deg2rad(deg);
    return this.rotateBy(rotation);
  }

  public distanceX(v: Vector){
    return this.x - v.x;
  }

  public absDistanceX(v: Vector){
    return Math.abs(this.distanceX(v));
  }

  public distanceY(v: Vector){
      return this.y - v.y;
  }

  public absDistanceY(v: Vector){
      return Math.abs(this.distanceY(v));
  }

  public distance(v: Vector){
      return Math.sqrt(this.distanceSq(v));
  }

  public distanceSq(v: Vector){
      const dx = this.distanceX(v);
      const dy = this.distanceY(v);

      return dx * dx + dy * dy;
  }

  public length(): number{
      return Math.sqrt(this.lengthSq());
  }

  public magnitude(): number{
      return this.length();
  }

  public lengthSq(): number{
      return this.x * this.x + this.y * this.y;
  }

  public isZero(): boolean{
      return this.x === 0 && this.y === 0;
  }

  public isEqualTo(v: Vector): boolean{
      return this.x === v.x && this.y === v.y;
  }

  public toString(): string{
      return `x: ${this.x}, y: ${this.y}`;
  }

  public toArray(): Array<number>{
    return [this.x, this.y];
  }

  public toObject(): {x: number, y: number}{
    return {x: this.x, y: this.y};
  }


}
