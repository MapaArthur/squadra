namespace ApplicationCore.Entities
{
    public class AppConfig : BaseEntity
    {
        public string Key { get; set; }

        public string Description { get; set; }

        public string Value { get; set; }
    }
}
