export default class HandleError extends Error {
  constructor(public status: number, message: string) {
    super(message);

    this.status = status;
  }
}
