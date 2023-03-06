const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

describe("Todo New Test Suite", () => {
  beforeAll(() => {
    add({
      title: "watching one",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    add({
      title: "Checking car",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Visiting showroom",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
  });
  test("Should add new todo", () => {
    const todoItemsCounts = all.length;
    add([
      {
        title: "Overdue status",
        completed: false,
        dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .slice(0, 10),
      },
    ]);
    expect(all.length).toBe(todoItemsCounts + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should check the retreive of Overdue", () => {
    expect(
      all.filter((item) => item.dueDate < new Date().toISOString().slice(0, 10))
        .length
    ).toBe(1);
    add({
      title: "Overdue Items",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    expect(
      all.filter((item) => item.dueDate < new Date().toISOString().slice(0, 10))
        .length
    ).toBe(2);
  });

  test("Check the retreive of Duetoday", () => {
    expect(
      all.filter(
        (item) => item.dueDate === new Date().toISOString().slice(0, 10)
      ).length
    ).toBe(1);
    add({
      title: "Submit one",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(
      all.filter(
        (item) => item.dueDate === new Date().toISOString().slice(0, 10)
      ).length
    ).toBe(2);
  });
});

test("Check the retreive of Overdue", () => {
  expect(
    all.filter((item) => item.dueDate > new Date().toISOString().slice(0, 10))
      .length
  ).toBe(1);
  add({
    title: "Shall drink tea",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .slice(0, 10),
  });
  expect(
    all.filter((item) => item.dueDate > new Date().toISOString().slice(0, 10))
      .length
  ).toBe(2);
});