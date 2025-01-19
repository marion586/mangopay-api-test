module.exports = (models) => {
  return {
    Query: {
      getUsers: async () => {
        return await models.User.findAll();
      },
      getUser: async (_, { id }) => {
        return await models.User.findById(id);
      },
      getTasks: async () => {
        return await models.Task.findAll();
      },
      getTask: async (_, { id }) => {
        return await models.Task.findById(id);
      },
    },
    Mutation: {
      createUser: async (_, { name, email }) => {
        const newUser = { id: `user_${Date.now()}`, name, email, tasks: [] };
        await models.User.create(newUser); // Insert user into DB
        return newUser;
      },
      createTask: async (_, { userId, title, description }) => {
        const user = await models.User.findById(userId);
        if (!user) throw new Error("User not found");

        const newTask = {
          id: `task_${Date.now()}`,
          title,
          description,
          completed: false,
          userId: user.id, // Store user ID in task for reference
        };
        await models.Task.create(newTask); // Insert task into DB
        return newTask;
      },
      updateTask: async (_, { id, title, description, completed }) => {
        const task = await models.Task.findById(id);
        if (!task) throw new Error("Task not found");

        const updatedTask = {};
        if (title !== undefined) updatedTask.title = title;
        if (description !== undefined) updatedTask.description = description;
        if (completed !== undefined) updatedTask.completed = completed;

        await models.Task.update(id, updatedTask); // Update task in DB
        return { ...task, ...updatedTask }; // Return updated task
      },
      deleteTask: async (_, { id }) => {
        const task = await models.Task.findById(id);
        if (!task) throw new Error("Task not found");

        await models.Task.delete(id); // Delete task from DB
        return task; // Return deleted task
      },
    },
    User: {
      tasks: async (user) => {
        return await models.Task.findAll({ userId: user.id }); // Find tasks for this user
      },
    },
    Task: {
      user: async (task) => {
        return await models.User.findById(task.userId); // Find user associated with this task
      },
    },
  };
};
