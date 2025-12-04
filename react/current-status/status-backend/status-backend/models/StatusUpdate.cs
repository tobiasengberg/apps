namespace status_backend.models;

public class StatusUpdate
{
    public int Id { get; set; }
    public string Status { get; set; }
    public DateTime Time { get; set; }

    public StatusUpdate()
    {
    }

    public StatusUpdate(string status, DateTime time)
    {
        Status = status;
        Time = time;
    }
}