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
                |> Map.put(:number, [:rand.uniform(10) - 1])
                |> Map.put(:max, data.max)
                |> Map.put(:seconds, data.seconds)
    Actions.all_reset(data)
  end

  def update_question(data, question_text) do
    data = data |> Map.put(:question_text, question_text)
                     |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, value } ->
                       { id, value |> Map.put(:question_text, question_text) } end), %{}))
    Actions.update_question(data, question_text)
  end

  def update_number(data, num) do
    if length(data.number) >= data.max do
      data = data |> Map.put(:number, tl(data.number) ++ [num])
                      |> Map.put(:participants, data.participants
                      |> Enum.map(fn {key, value} -> {key, value
                      |> Map.put(:number, tl(valule.number) ++ [num])} end)
                      |> Enum.into(%{}))
    else
      data = data |> Map.put(:number, data.number ++ [num])
                      |> Map.put(:participants, data.participants
                      |> Enum.map(fn {key, value} -> {key, value
                      |> Map.put(:number, valule.number ++ [num])} end)
                      |> Enum.into(%{}))
    end
    Actions.update_number(data)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end