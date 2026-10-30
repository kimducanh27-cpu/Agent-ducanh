const form = document.querySelector("#signup-form");
const status = document.querySelector("#form-status");
const fields = {
  name: document.querySelector("#name"),
  email: document.querySelector("#email"),
  goal: document.querySelector("#goal"),
};

const errors = {
  name: document.querySelector("#name-error"),
  email: document.querySelector("#email-error"),
  goal: document.querySelector("#goal-error"),
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(key, message) {
  const field = fields[key];
  const error = errors[key];
  if (!field || !error) return;
  if (message) {
    field.setAttribute("aria-invalid", "true");
    error.textContent = message;
    error.hidden = false;
  } else {
    field.removeAttribute("aria-invalid");
    error.textContent = "";
    error.hidden = true;
  }
}

function validate() {
  let firstInvalid = null;
  const name = fields.name.value.trim();
  const email = fields.email.value.trim();
  const goal = fields.goal.value;

  if (!name) {
    setError("name", "Nhập tên để mình biết gọi bạn là gì.");
    firstInvalid ||= fields.name;
  } else {
    setError("name", "");
  }

  if (!email) {
    setError("email", "Nhập email để nhận bản demo.");
    firstInvalid ||= fields.email;
  } else if (!emailPattern.test(email)) {
    setError("email", "Email chưa đúng dạng. Ví dụ: ban@example.com.");
    firstInvalid ||= fields.email;
  } else {
    setError("email", "");
  }

  if (!goal) {
    setError("goal", "Chọn một mục tiêu.");
    firstInvalid ||= fields.goal;
  } else {
    setError("goal", "");
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return null;
  }

  return { name, email, goal };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "";
  const values = validate();
  if (!values) return;

  status.textContent = `Đã ghi nhận, ${values.name}. Đây là bản demo — không có email nào được gửi.`;
  form.reset();
});

Object.values(fields).forEach((field) => {
  field.addEventListener("input", () => {
    if (field.value.trim()) setError(field.id, "");
  });
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
