namespace ApplicationCore.Entities
{
    public class System : BaseEntity
    {
        public string description { get; set; }
        public string initials { get;set;}
        public string email { get; set; }
        public string url { get; set; }
        public bool status { get; set; }

        public string justification { get; set; }

        public string newjustification { get; set; }
    }
}
