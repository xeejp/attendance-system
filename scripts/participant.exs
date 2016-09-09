defmodule AttendanceSystem.Participant do
  alias AttendanceSystem.Actions

  # Actions
  def fetch_contents(data, id) do
#    if data.page == "waiting", do: data = data |> put_in([:participants, id, :active], true)
    Actions.update_participant_contents(data, id)
  end

  def press_numeric(data, id, num) do
    numer = data |> get_in([:participants, id, number])
    data = data |> put_in([:participants, id number], Enum.map(Enum.take(number, num), fn x ->
        if x == num do
          -1
        else
          x
        end
      end))
  end

  # Utilities
  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    format_participant(participant)
      |> Map.merge(format_data(data))
  end
end
