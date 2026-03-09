## Hash Map
Module for HashMap integrated with javascript. will only allow strings as keys.
uses linked lists to handle collisions(https://github.com/SuperScuffedDev/linked-list).

### methods

- `set(key, value)`: adds or updates the node linked to `key` and its `value`.

- `get(key)`: returns the value linked to `key`.

- `has(key)`: returns `true` if `key` if found in the table. otherwise, returns `false`.

- `remove(key)`: removes the node linked to `key` from the table and returns `true`. otherwise, returns `false`.

- `length()`: returns the total number of nodes in the table.

- `clear()`: removes all nodes in the table, esentially resetting it.

- `keys()`: returns an array of every key in the table

- `values()`: returns an array of every value in the table.

- `entries()`: returns an array of every key: value pair in the table. structured as: [[key, value], [key2, value2]...]
