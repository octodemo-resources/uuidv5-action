# uuidv5-action

GitHub Action that uses UUID v5 to create UUIDs for namespaces and values provided to it.

## Parameters

* `namespace`: A string or valid UUID that will be used to namespace the generated UUID value
* `value`: The value to turn into a UUID v5 value

## Outputs

* `uuid`: The generated UUID v5 value for the provided namespace and value
* `uuid_short`: The generated UUID v5 value stripped of any `-`'s so as to be only 32 characters long (useful with cloud resources that impose 32 character limits on strings)
* `namespace_uuid`: The namespace value as a UUID that was used in the generation. If the namespace value was a UUID to begin with then this will contain that value, otherewise
  it is the result of the namespace being converted into a valid UUID v5 before being used to encode the value

## Examples

Create a UUID v5 value for a string namespace and value:
```
- name: Convert to UUID
  id: uuid_v5_values
  uses: octodemo-resources/uuidv5-action@v1
  with:
    namespace: bookstore-demo
    value: qa-peter-murray-patch-1
```

will create the following outputs:
| Output Name | Value |
|-------------|-------|
|`uuid`| 257feaea-bbc8-5c80-bde1-2ae86bceff13 |
|`uuid_short`| 257feaeabbc85c80bde12ae86bceff13 |
|`namespace_uuid`| 3ee83601-31ad-563a-9a57-887cf25ff9af |
