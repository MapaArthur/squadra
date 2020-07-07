using System;

namespace ApplicationCore.Entities
{
    // This can easily be modified to be BaseEntity<T> and public T Id to support different key types.
    // Using non-generic integer types for simplicity and to ease caching logic
    public class BaseEntity
    {
        public int ID { get; set; }
        public DateTime CreationDate { get; set; }

        public DateTime LastModificationDate { get; set; }
    }
}
