import React, { useState } from 'react';
import { Member } from '../../types/library';
import { Plus, Search, Edit, Trash2, User, Mail, Phone, MapPin } from 'lucide-react';
import MemberForm from './MemberForm';
import Modal from '../UI/Modal';

interface MemberManagementProps {
  members: Member[];
  onAddMember: (member: Omit<Member, 'id'>) => void;
  onUpdateMember: (id: string, member: Partial<Member>) => void;
  onDeleteMember: (id: string) => void;
  getBorrowHistory: (memberId: string) => any[];
}

const MemberManagement: React.FC<MemberManagementProps> = ({
  members,
  onAddMember,
  onUpdateMember,
  onDeleteMember,
  getBorrowHistory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMemberType, setSelectedMemberType] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedMemberType === 'all' || member.membershipType === selectedMemberType;
    return matchesSearch && matchesType;
  });

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  const handleUpdateMember = (memberData: Omit<Member, 'id'>) => {
    if (editingMember) {
      onUpdateMember(editingMember.id, memberData);
      setIsEditModalOpen(false);
      setEditingMember(null);
    }
  };

  const handleDeleteMember = (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      onDeleteMember(memberId);
    }
  };

  const getMemberTypeColor = (type: string) => {
    switch (type) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'faculty': return 'bg-purple-100 text-purple-800';
      case 'public': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Member Management</h1>
          <p className="text-amber-600">Manage library members and their information</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search members by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-2">
          {['all', 'student', 'faculty', 'public'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedMemberType(type)}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                selectedMemberType === type
                  ? 'bg-amber-200 text-amber-900 shadow-md'
                  : 'bg-white border border-amber-200 text-amber-700 hover:bg-amber-50'
              }`}
            >
              {type === 'all' ? 'All Members' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const borrowHistory = getBorrowHistory(member.id);
          const activeBorrows = borrowHistory.filter(record => record.status === 'borrowed').length;
          
          return (
            <div key={member.id} className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-900">{member.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getMemberTypeColor(member.membershipType)}`}>
                      {member.membershipType.charAt(0).toUpperCase() + member.membershipType.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-amber-700">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-amber-700">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-start space-x-2 text-amber-700">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span className="text-sm">{member.address}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-600">Member since:</span>
                  <span className="text-amber-900 font-medium">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-amber-600">Active borrows:</span>
                  <span className="text-amber-900 font-medium">{activeBorrows}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-amber-900 mb-2">No members found</h3>
          <p className="text-amber-600">Try adjusting your search criteria or add a new member.</p>
        </div>
      )}

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Member"
      >
        <MemberForm
          onSubmit={(memberData) => {
            onAddMember(memberData);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingMember(null);
        }}
        title="Edit Member"
      >
        {editingMember && (
          <MemberForm
            initialData={editingMember}
            onSubmit={handleUpdateMember}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingMember(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default MemberManagement;