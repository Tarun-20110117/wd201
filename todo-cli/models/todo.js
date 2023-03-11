"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueitem = await this.overdue();
      const overdue = overdueitem.map((todo) => todo.displayableString());
      console.log(overdue.join("\n").trim());

      console.log();

      console.log("Due Today");
      const todayitem = await this.overdue();
      const duetoday = todayitem.map((todo) => todo.displayableString());
      console.log(duetoday.join("\n").trim());
      console.log();

      console.log("Due Later");
      const duelateritem = await this.overdue();
      const duelater = duelateritem.map((todo) => todo.displayableString());
      console.log(duelater.join("\n").trim());
    }

    static async overdue() {
      const date = new Date();
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: date },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueToday() {
      const date = new Date();
      return await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: date },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueLater() {
      const date = new Date();
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: date },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      const todos = await Todo.findByPk(id);
      if (todos) {
        todos.completed = true;
        await todos.save();
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const dayForDisplay = new Date(this.dueDate);
      return dayForDisplay.getDate() === new Date().getDate()
        ? `${this.id}. ${checkbox} ${this.title}`.trim()
        : `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`.trim();
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};