"use client";

export default function LoginPage() {
  function handleSubmitForm(data: FormData) {
    const username = data.get("username");
    console.log(username);
    const password = data.get("password");
    console.log(password);
  }

  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="w-[400px] bg-secondary p-6 rounded-xl shadow flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <form className="flex flex-col gap-4" action={handleSubmitForm}>
          <fieldset>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full bg-gray-700 px-4 py-2 rounded-lg bg-gray-700"
              placeholder="Username or email"
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full bg-gray-700 px-4 py-2 rounded-lg"
              placeholder="Password"
            />
          </fieldset>
          <input
            type="submit"
            className="bg-primary py-2 rounded-full hover:bg-accent"
          />
        </form>
      </div>
    </div>
  );
}
