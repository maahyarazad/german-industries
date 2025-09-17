import { signal, computed } from "@preact/signals-react";

export function createAppState() {

  const user = signal(null);

  const setUser = (_user) => {
    user.value = _user;
    if (_user) localStorage.setItem("gic-user", JSON.stringify(_user));
    else localStorage.removeItem("gic-user");
  };

  // Restore user from localStorage immediately
  const savedUser = localStorage.getItem("gic-user");
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("gic-user");
    }
  }


  const authenticated = computed(
    () => !!(user.value && Object.keys(user.value).length > 0)
  );

  return { user, setUser, authenticated };
}
