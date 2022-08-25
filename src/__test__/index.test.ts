import "reflect-metadata";
import { createTableInput } from "../constants/CreateTableInput";
import container from "../container";
import { TableService } from "../services/TableService";
import { sleep } from "../utils/sleep";

describe("api e2e test", () => {
  let tableService: TableService;

  beforeAll(() => {
    tableService = container.get(TableService);
  });

  it("should create table", async () => {
    const res = await tableService.createTable(createTableInput);
    let tables = await tableService.listTables();
    expect(tables.TableNames).toEqual(["td_notes_sdk"]);

    await sleep(2000);
    await tableService.deleteTable({ TableName: createTableInput.TableName });
    tables = await tableService.listTables();
    expect(tables.TableNames?.length).toBe(0);
  });
});
