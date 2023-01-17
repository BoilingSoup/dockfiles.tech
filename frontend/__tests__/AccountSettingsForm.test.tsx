import { renderWithContexts } from "../test-utils/render";
import { screen } from "@testing-library/react";
import { AccountSettingsForm } from "../components/settings/AccountSettingsForm";
import userEvent from "@testing-library/user-event";

function renderWithUser({ verified }: { verified: boolean }) {
  const emailVerifiedAt = verified ? "some ISO string..." : null;
  renderWithContexts(<AccountSettingsForm />, {
    user: {
      id: 1,
      avatar: "avatar.com",
      email: "test@test.com",
      email_verified_at: emailVerifiedAt,
      is_admin: false,
      name: "test account",
      github_id: null,
      gitlab_id: null,
    },
  });
}

describe("Change Display Name input shows a validation error", () => {
  test("when name is less than 4 characters", async () => {
    const user = userEvent.setup();
    renderWithUser({ verified: false });

    const nameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.clear(nameInput);
    const warningText = await screen.findByText(/must be between 4-20 characters/i);

    expect(warningText).toBeInTheDocument();
  });

  test("when name is more than 20 characters", async () => {
    const user = userEvent.setup();
    renderWithUser({ verified: false });

    const nameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });

    await user.clear(nameInput);
    await user.click(nameInput);
    await user.keyboard("QQQQQQQQQQQQQQQQQQQQQ"); // 21 chars
    const warningText = await screen.findByText(/must be between 4-20 characters/i);

    expect(warningText).toBeInTheDocument();
  });
});

describe("Email input field", () => {
  test("is disabled when user state claims email is not verified", () => {
    renderWithUser({ verified: false });

    const emailInput = screen.getByRole("textbox", {
      name: "Email",
    });

    expect(emailInput).toHaveAttribute("disabled");
  });

  test("is enabled when user state claims email is verified", () => {
    renderWithUser({ verified: true });

    const emailInput = screen.getByRole("textbox", {
      name: "Email",
    });

    expect(emailInput).not.toHaveAttribute("disabled");
  });

  describe("badge", () => {
    test('shows "unverified" when user state claims email is not verified', () => {
      renderWithUser({ verified: false });

      const unverifiedBadge = screen.getByText("Unverified");

      expect(unverifiedBadge).toBeInTheDocument();
    });

    test('shows "verified" when user state claims email is verified', () => {
      renderWithUser({ verified: true });

      const verifiedBadge = screen.getByText("Verified");

      expect(verifiedBadge).toBeInTheDocument();
    });
  });
});

describe("save changes button", () => {
  test("is disabled initially", () => {
    renderWithUser({ verified: false });

    const saveChangesBtn = screen.getByRole("button", {
      name: /save changes/i,
    });

    expect(saveChangesBtn).toHaveAttribute("disabled");
  });

  test("is enabled after form input is changed and valid", async () => {
    const user = userEvent.setup();
    renderWithUser({ verified: false });

    const nameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.click(nameInput);
    await user.keyboard("z");
    const saveChangesBtn = screen.getByRole("button", {
      name: /save changes/i,
    });

    expect(saveChangesBtn).not.toHaveAttribute("disabled");
  });

  test("is disabled when form input is invalid", async () => {
    const user = userEvent.setup();
    renderWithUser({ verified: false });

    const nameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.clear(nameInput);
    await screen.findByText(/must be between 4-20 characters/i);
    const saveChangesBtn = screen.getByRole("button", {
      name: /save changes/i,
    });

    expect(saveChangesBtn).toHaveAttribute("disabled");
  });
});

describe("resend verification email button", () => {
  test("is disabled when user state claims email is verified", () => {
    renderWithUser({ verified: true });

    const resendEmailBtn = screen.getByRole("button", {
      name: /resend verification email/i,
    });

    expect(resendEmailBtn).toHaveAttribute("disabled");
  });

  test("is enabled when user state claims email is unverified", () => {
    renderWithUser({ verified: false });

    const resendEmailBtn = screen.getByRole("button", {
      name: /resend verification email/i,
    });

    expect(resendEmailBtn).not.toHaveAttribute("disabled");
  });
});
