using Piranha.Extend;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DylanLo.SuperAdmin.Blocks.Meta
{
    [AttributeUsage(AttributeTargets.Property)]
    public class EditorFieldAttribute : FieldAttribute
    {
        public string Lang {  get; set; }
    }
}
