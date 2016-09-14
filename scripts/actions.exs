defmodule AttendanceSystem.Actions do
  alias AttendanceSystem.Participant
  alias AttendanceSystem.Host
  alias AttendanceSystem.Main

  require Logger

  def change_page(data, page) do
    action = get_action("change page", page)
    format(data, nil, dispatch_to_all(data, action))
  end

  def join(data, id, participant) do
    data = data |> Map.put(:joined, data.joined + 1)
    haction = get_action("join", %{id: id, participant: participant, joined: data.joined})
    paction = get_action("joined", Map.size(data.participants))
    format(data, haction, dispatch_to_all(data, paction))
  end
  
  def update_host_contents(data) do
    host = get_action("update contents", Host.format_contents(data))
    format(data, host)
  end

  def all_reset(data) do
    haction = get_action("reset", %{ participants: data.participants, joined: data.joined, answered: data.answered })
    paction = get_action("reset", Main.new_participant(data))
    format(data, haction, paction)
  end

  def update_question(data) do
    haction = get_action("qupdate", %{max: data.max, combo: data.combo, seconds: data.seconds, timeout: data.timeout, timeoutable: data.timeoutable})
    format(data, haction)
  end

  def update_number(data) do
    action = get_action("nupdate", data.number)
    format(data, action)
  end

  def update_student_info(data) do
    action = get_action("sInfoupdate", data.studentInfo)
    format(data, action)
  end

  def update_participant_contents(data, id) do
    participant = dispatch_to(id, get_action("update contents", Participant.format_contents(data, id)))
    format(data, nil, participant)
  end

  def success(data, id) do
    haction = get_action("answer", %{id: id, snum: data.participants[id].snum, finishtime: data.participants[id].finishtime})
    paction = get_action("answered", true)
    format(data, haction, dispatch_to(id, paction))
  end

  def update_snum(data, id, snum) do
    paction = get_action("supdate", snum)
    format(data, nil, dispatch_to(id, paction))
  end

  # Utilities

  defp get_action(type, params) do
    %{
      type: type,
      payload: params
    }
  end

  defp dispatch_to(map \\ %{}, id, action) do
    Map.put(map, id, %{action: action})
  end

  defp dispatch_to_all(%{participants: participants}, action) do
    Enum.reduce(participants, %{}, fn {id, _}, acc -> dispatch_to(acc, id, action) end)
  end

  defp format(data, host, participants \\ nil) do
    result = %{"data" => data}
    unless is_nil(host) do
      result = Map.put(result, "host", %{action: host})
    end
    unless is_nil(participants) do
      result = Map.put(result, "participant", participants)
    end
    {:ok, result}
  end
end
