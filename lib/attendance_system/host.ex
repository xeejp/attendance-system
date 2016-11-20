defmodule Attendance.Host do
  alias Attendance.Main
  alias Attendance.Actions

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
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, value } ->
      {id, Main.new_participant(data) |> Map.put(:starttime, value.starttime) |> Map.put(:joined, Map.size data.participants)}
    end), %{}))
                |> Map.put(:joined, Map.size(data.participants))
                |> Map.put(:answered, 0)
                |> Map.put(:number, [])
                |> Map.put(:backup, [])
                |> Map.put(:time, 0)
    Actions.all_reset(data)
  end

  def update_question(data, question_text) do
    data = data |> Map.put(:max, question_text["max"])
                    |> Map.put(:combo, question_text["combo"])
                    |> Map.put(:seconds, question_text["seconds"])
                    |> Map.put(:timeout, question_text["timeout"])
                    |> Map.put(:timeoutable, question_text["timeoutable"])
    Actions.update_question(data)
  end

  def update_number(data, num) do
    if length(data.number) >= data.max do
      data = data |> Map.put(:number, tl(data.number) ++ [num])
    else
      data = data |> Map.put(:number, data.number ++ [num])
    end
    if length(data.backup) >= data.combo + 1 do
      data = data |> Map.put(:backup, tl(data.backup) ++ [num])
    else
      data = data |> Map.put(:backup, data.backup ++ [num])
    end
    data = data |> Map.put(:time, data.time + 1)
    Actions.update_number(data)
  end

  def update_student_info(data, info) do
    data = data |> Map.put(:studentInfo, info)
    Actions.update_student_info(data)
  end

  def change_fullscreen(data) do
    Actions.change_fullscreen(data)
  end

  def escape_fullscreen(data) do
    Actions.escape_fullscreen(data)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end
