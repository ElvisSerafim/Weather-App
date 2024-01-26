import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/app/page";
import { ToastProvider } from "@/contexts/ToastContext";

describe("App component", () => {
  test("renders App component", async () => {
    act(() => {
      render(
        <ToastProvider>
          <App />
        </ToastProvider>
      );
    });

    expect(screen.getByText("5 Day Forecast")).toBeInTheDocument();
  });

  test("checks loadUserLocationWeather function", async () => {
    act(() => {
      render(
        <ToastProvider>
          <App />
        </ToastProvider>
      );
    });
    await screen.findByText("5 Day Forecast");
    expect(screen.getByText("5 Day Forecast")).toBeInTheDocument();
  });
});
