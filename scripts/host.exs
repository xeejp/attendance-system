defmodule AttendanceSystem.Host do
  alias AttendanceSystem.Main
  alias AttendanceSystem.Actions

  require Logger

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end

  def all_reset(data) do
    flag = true
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, _ } ->
      {id, Main.new_participants}
    end), %{}))
                |> Map.put(:joined, Map.size(data.participants))
                |> Map.put(:answered, 0)
                |> Map.put(:number, [:rand.uniform(10) - 1, -1])
    Actions.all_reset(data)
  end

  def update_question(data, question_text) do
    data = data |> Map.put(:question_text, question_text)
                     |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, value } ->
                       { id, value |> Map.put(:question_text, question_text) } end), %{}))
    Actions.update_question(data, question_text)
  end

  def update_number(data) do
    [now, _] = data.number
    data = data |> Map.put(:number, [:rand.uniform(10) - 1, now])
    Actions.update_number(data)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end