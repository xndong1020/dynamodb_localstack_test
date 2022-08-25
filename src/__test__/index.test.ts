import { Key, PutItemInputAttributeMap } from "aws-sdk/clients/dynamodb";
import "reflect-metadata";
import { createTableInput } from "../constants/CreateTableInput";
import container from "../container.config";
import { TableItemService } from "../services/TableItemService";
import { TableService } from "../services/TableService";
import { sleep } from "../utils/sleep";

describe("api e2e test", () => {
  let tableService: TableService;
  let tableItemService: TableItemService;

  beforeAll(() => {
    tableService = container.get(TableService);
    tableItemService = container.get(TableItemService);
  });

  it("should create table", async () => {
    const res = await tableService.createTable(createTableInput);
    let tables = await tableService.listTables();
    expect(tables.TableNames).toEqual(["td_notes_sdk"]);

    await sleep(1000);

    await tableItemService.put({
      TableName: createTableInput.TableName,
      Item: {
        user_id: "1232",
        timestamp: 200,
      } as PutItemInputAttributeMap,
    });

    const queryResult = await tableItemService.get({
      TableName: "td_notes_sdk",
      Key: {
        user_id: "1232",
        timestamp: 200,
      } as Key,
    });

    expect(queryResult.Item).toMatchObject({ user_id: "1232", timestamp: 200 });

    await sleep(1000);

    await tableService.deleteTable({ TableName: createTableInput.TableName });
    tables = await tableService.listTables();
    expect(tables.TableNames?.length).toBe(0);
  });
});
