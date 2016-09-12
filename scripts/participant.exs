defmodule AttendanceSystem.Participant do
  alias AttendanceSystem.Actions
  
  require Logger

  # Actions
  def fetch_contents(data, id) do
#    if data.page == "waiting", do: data = data |> put_in([:participants, id, :active], true)
    Actions.update_participant_contents(data, id)
  end

  def press_numeric(data, id, num) do
    if data.participants[id].timestamp <= data.time - data.max do
       data = data |> put_in([:participants, id, :number], [])
    end
    data = data |> put_in([:participants, id, :number], data.participants[id].number ++ [num])
                    |> put_in([:participants, id, :timestamp], data.time)
    if(length(data.participants[id].number) == data.combo) do
     a = String.slice(Enum.join(data.backup, ""), 0, data.combo)
     b = String.slice(Enum.join(data.backup, ""), 1, data.combo + 1)
     case Enum.join(data.participants[id].number, "") do
       ^a -> Actions.success(data = data |> put_in([:participants, id, :answered], true), id)
       ^b -> Actions.success(data = data |> put_in([:participants, id, :answered], true), id)
         _ -> {:ok, %{"data" =>  (data = data |> put_in([:participants, id, :number], 
           if length(data.participants[id].number) >= data.combo do
             tl(data.participants[id].number)
           else
             data.participants[id].number
           end
         ))}}
      end
    else
        {:ok, %{"data" =>  (data = data |> put_in([:participants, id, :number], 
           if length(data.participants[id].number) >= data.combo do
             tl(data.participants[id].number)
           else
             data.participants[id].number
           end
         ))}}
    end
  end

  def update_snum(data, id, snum) do
    data = data |> put_in([:participants, id, :snum], snum)
    Actions.update_snum(data, id, snum)
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
