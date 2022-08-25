import "reflect-metadata";

import container from "./container.config";
import { TableService } from "./services/TableService";
import { createTableInput } from "./constants/CreateTableInput";
import { TableItemService } from "./services/TableItemService";
import {
  ExpressionAttributeValueMap,
  ItemList,
  Key,
  PutItemInputAttributeMap,
} from "aws-sdk/clients/dynamodb";

(async () => {
  const tableSvc = container.get(TableService);
  const tableItemSvc = container.get(TableItemService);

  try {
    // await tableSvc.createTable(createTableInput);
    // const tables = await tableSvc.listTables();
    // console.log("tables", tables.TableNames);
    // if (tables.TableNames?.length) {
    //   const details = await tableSvc.describeTable({
    //     TableName: tables.TableNames[0],
    //   });
    //   console.log("details", details);
    // }
    // const res = await tableItemSvc.put({
    //   TableName: createTableInput.TableName,
    //   Item: {
    //     user_id: "1232",
    //     timestamp: 201,
    //   } as PutItemInputAttributeMap,
    // });
    // console.log("aaa", res);
    // const res1 = await tableItemSvc.get({
    //   TableName: "td_notes_sdk",
    //   Key: {
    //     user_id: "1232",
    //     timestamp: 201,
    //   } as Key,
    // });
    // const res2 = await tableItemSvc.update({
    //   TableName: "td_notes_sdk",
    //   Key: {
    //     user_id: "1232",
    //     timestamp: 200,
    //   } as Key,
    //   UpdateExpression: "set #t = :t",
    //   ExpressionAttributeNames: {
    //     "#t": "title",
    //   },
    //   ExpressionAttributeValues: {
    //     ":t": "Some title",
    //   } as ExpressionAttributeValueMap,
    // });
    // console.log("res2", res2);
    // const res3 = await tableItemSvc.delete({
    //   TableName: "td_notes_sdk",
    //   Key: {
    //     user_id: "1232",
    //     timestamp: 201,
    //   } as Key,
    // });
    // console.log("res3", res3);
    // const res4 = await tableItemSvc.batchWrite({
    //   RequestItems: {
    //     td_notes_sdk: [
    //       {
    //         DeleteRequest: {
    //           Key: {
    //             user_id: "1232",
    //             timestamp: 200,
    //           } as Key,
    //         },
    //       },
    //       {
    //         PutRequest: {
    //           Item: {
    //             user_id: "new_user_id_01",
    //             timestamp: 100,
    //           } as PutItemInputAttributeMap,
    //         },
    //       },
    //       {
    //         PutRequest: {
    //           Item: {
    //             user_id: "new_user_id_02",
    //             timestamp: 200,
    //           } as PutItemInputAttributeMap,
    //         },
    //       },
    //     ],
    //   },
    // });
    // console.log("res4", res4);
    // const res6 = await tableItemSvc.put({
    //   TableName: "td_notes_sdk",
    //   Item: {
    //     user_id: "new_user_id_01",
    //     timestamp: 100,
    //     title: "some title",
    //     content: "init content",
    //   } as PutItemInputAttributeMap,
    //   ConditionExpression: "#t = :t",
    //   ExpressionAttributeNames: {
    //     "#t": "timestamp",
    //   },
    //   ExpressionAttributeValues: {
    //     ":t": 100,
    //   } as ExpressionAttributeValueMap,
    // });
    // console.log("res6", res6);
    // const res7 = await tableItemSvc.query({
    //   TableName: "td_notes_sdk",
    //   KeyConditionExpression: "user_id = :t",
    //   ExpressionAttributeValues: {
    //     ":t": "new_user_id_01",
    //   } as ExpressionAttributeValueMap,
    // });
    // const res8 = await tableItemSvc.scan({
    //   TableName: "td_notes_sdk",
    //   FilterExpression: "title = :title",
    //   ExpressionAttributeValues: {
    //     ":title": "some title",
    //   } as ExpressionAttributeValueMap,
    // });
    // const res9 = await tableItemSvc.batchGet({
    //   RequestItems: {
    //     td_notes_sdk: {
    //       Keys: [
    //         {
    //           user_id: "new_user_id_02",
    //           timestamp: 200,
    //         } as Key,
    //         {
    //           user_id: "new_user_id_01",
    //           timestamp: 100,
    //         } as Key,
    //       ],
    //     },
    //   },
    // });
    // console.log("res9", JSON.stringify(res9, null, 2));
    let startKeysOfNextScan: Key | undefined;
    let endKeysFromLastScan: Key | undefined;
    let results: ItemList = [];
    const initialScan = await tableItemSvc.scan({
      TableName: "td_notes_sdk",
      Limit: 1,
    });
    if (initialScan.Items?.length) {
      results = [...results, ...initialScan.Items];
    }

    startKeysOfNextScan = endKeysFromLastScan = initialScan.LastEvaluatedKey;

    while (!!endKeysFromLastScan) {
      const SubsequentScan = await tableItemSvc.scan({
        TableName: "td_notes_sdk",
        Limit: 1,
        ExclusiveStartKey: startKeysOfNextScan,
      });
      if (SubsequentScan.Items?.length) {
        results = [...results, ...SubsequentScan.Items];
      }
      startKeysOfNextScan = endKeysFromLastScan =
        SubsequentScan.LastEvaluatedKey;
    }

    console.log("final", JSON.stringify(results, null, 2));
  } catch (e) {
    console.error("catch e", e);
  }
})();
